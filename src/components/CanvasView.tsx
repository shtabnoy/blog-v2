/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import theme from '../utils/colors'
import HexArticle from './HexArticle'
import { useHistory } from 'react-router-dom'
import { loadImage, HEX_RADIUS, HEX_MARGIN } from '../utils/helpers'
import { Hexagon, Images, Article, Direction } from '../types'

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

const insert = (
  id: string,
  // hexagons: Hexagon[],
  x: number,
  y: number,
  coordsCondition: boolean,
  addHex: (hex: Hexagon) => void
): boolean => {
  if (coordsCondition) {
    // if (!hexagons.find((h) => h.x === x && h.y === y) && coordsCondition) {
    addHex({ id, x, y, radius: HEX_RADIUS, margin: HEX_MARGIN })
    return true
  }
  return false
}

const hexOnStage = (hexs: Hexagon[], x: number, y: number): boolean =>
  hexs.some((h) => h.x === x && h.y === y)

const hexFits = (
  hex: Hexagon,
  dir: Direction,
  stageX: number,
  stageY: number
): boolean => {
  switch (dir) {
    case Direction.left:
      return hex.x - hex.radius - hex.margin + stageX > 0
    case Direction.right:
      return hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH
    case Direction['top-right']:
      return (
        hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH &&
        hex.y - hex.radius - hex.margin + stageY > 0
      )
    case Direction['top-left']:
      return (
        hex.x - hex.radius - hex.margin + stageX > 0 &&
        hex.y - hex.radius - hex.margin + stageY > 0
      )
    case Direction['bottom-right']:
      return (
        hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH &&
        hex.y + hex.radius + hex.margin + stageY < CANVAS_HEIGHT
      )
    case Direction['bottom-left']:
      return (
        hex.x - hex.radius - hex.margin + stageX > 0 &&
        hex.y + hex.radius + hex.margin + stageY < CANVAS_HEIGHT
      )
    default:
      return false
  }
}

const onDragMove = (
  event: any,
  hexagons: Hexagon[],
  addHex: (hex: Hexagon) => void,
  articleId: string
) => {
  const stageX = event.target.getStage().attrs.x // leftmost coordinate of the stage
  const stageY = event.target.getStage().attrs.y // topmost coordinate of the stage

  let x
  let y
  let cond
  for (let hexagon of hexagons) {
    // add on the left
    x = hexagon.x - 2 * hexagon.radius
    y = hexagon.y
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction.left, stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the right
    x = hexagon.x + 2 * hexagon.radius
    y = hexagon.y
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction.right, stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the top right
    x = hexagon.x + hexagon.radius
    y = hexagon.y - 1.75 * hexagon.radius
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction['top-right'], stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the bottom right
    x = hexagon.x + hexagon.radius
    y = hexagon.y + 1.75 * hexagon.radius
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction['bottom-right'], stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the top left
    x = hexagon.x - hexagon.radius
    y = hexagon.y - 1.75 * hexagon.radius
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction['top-left'], stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the bottom left
    x = hexagon.x - hexagon.radius
    y = hexagon.y + 1.75 * hexagon.radius
    cond =
      !hexOnStage(hexagons, x, y) &&
      hexFits(hexagon, Direction['bottom-left'], stageX, stageY)
    if (insert(articleId, x, y, cond, addHex)) break
  }
}

const stageStyle = {
  background: `linear-gradient(to bottom, ${theme.main.bgPrimary}, ${theme.main.bgSecondary})`,
}

interface CanvasViewProps {
  articles: Article[]
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  const initialHex: Hexagon = {
    id: articles[0].id,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    radius: HEX_RADIUS,
    margin: HEX_MARGIN,
    // coverUrl: articles[0].cover.url,
    // text: articles[0].title,
  }
  const history = useHistory()
  const [images, setImages] = useState<Images>({})
  const [hexagons, setHexagons] = useState<Hexagon[]>([initialHex])

  useEffect(() => {
    const getImg = async () => {
      const lastHex = hexagons[hexagons.length - 1]
      const imgUrl = articles.find(
        (article: Article) => article.id === lastHex.id
      ).cover.url
      const image = await loadImage(imgUrl)
      setImages((images) => ({
        ...images,
        [lastHex.id]: image as HTMLImageElement,
      }))
    }
    getImg()
  }, [hexagons])

  return (
    <React.Fragment>
      <Stage
        draggable
        width={window.innerWidth}
        height={window.innerHeight}
        style={stageStyle}
        onDragMove={(event) => {
          if (hexagons.length >= articles.length) return

          onDragMove(
            event,
            hexagons,
            (hex: Hexagon) => setHexagons([...hexagons, hex]),
            articles[hexagons.length].id
          )
        }}
      >
        <Layer>
          {hexagons.map((hexagon) => (
            <HexArticle
              hexagon={hexagon}
              article={articles.find(
                (article: Article) => article.id === hexagon.id
              )}
              // hexRadius={hr}
              image={images[hexagon.id]}
              history={history}
            />
          ))}
        </Layer>
      </Stage>
    </React.Fragment>
  )
}

export default CanvasView

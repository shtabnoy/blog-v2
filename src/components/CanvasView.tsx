/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import HexArticle from './HexArticle'
import { useHistory } from 'react-router-dom'
import { loadImage, HEX_RADIUS, HEX_MARGIN } from '../utils/helpers'
import { Hexagon, Images, Article, Direction } from '../types'
import { stageStyle } from '../utils/styles'

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

const insert = (
  id: string,
  x: number,
  y: number,
  coordsCondition: boolean,
  addHex: (hex: Hexagon) => void
): boolean => {
  if (coordsCondition) {
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
    case Direction.l:
      return hex.x - hex.radius - hex.margin + stageX > 0
    case Direction.r:
      return hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH
    case Direction.tr:
      return (
        hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH &&
        hex.y - hex.radius - hex.margin + stageY > 0
      )
    case Direction.tl:
      return (
        hex.x - hex.radius - hex.margin + stageX > 0 &&
        hex.y - hex.radius - hex.margin + stageY > 0
      )
    case Direction.br:
      return (
        hex.x + hex.radius + hex.margin + stageX < CANVAS_WIDTH &&
        hex.y + hex.radius + hex.margin + stageY < CANVAS_HEIGHT
      )
    case Direction.bl:
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
  hexs: Hexagon[],
  addHex: (hex: Hexagon) => void,
  articleId: string
) => {
  const stX = event.target.getStage().attrs.x // leftmost coordinate of the stage
  const stY = event.target.getStage().attrs.y // topmost coordinate of the stage

  let x
  let y
  let cond
  for (let hex of hexs) {
    // add on the left
    x = hex.x - 2 * hex.radius
    y = hex.y
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.l, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the right
    x = hex.x + 2 * hex.radius
    y = hex.y
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.r, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the top right
    x = hex.x + hex.radius
    y = hex.y - 1.75 * hex.radius
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.tr, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the bottom right
    x = hex.x + hex.radius
    y = hex.y + 1.75 * hex.radius
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.br, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the top left
    x = hex.x - hex.radius
    y = hex.y - 1.75 * hex.radius
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.tl, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break

    // add on the bottom left
    x = hex.x - hex.radius
    y = hex.y + 1.75 * hex.radius
    cond = !hexOnStage(hexs, x, y) && hexFits(hex, Direction.bl, stX, stY)
    if (insert(articleId, x, y, cond, addHex)) break
  }
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
              key={hexagon.id}
              hexagon={hexagon}
              article={articles.find((a) => a.id === hexagon.id)}
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

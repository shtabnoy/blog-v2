/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Stage, Layer } from 'react-konva'
import theme from '../utils/colors'
import HexArticle from './HexArticle'
import { useHistory } from 'react-router-dom'
import { loadImage } from '../utils/helpers'
import { Hexagon, Images, Article } from '../types'

// Hex radius
const hr = 200

// Hex gap
const hg = 200

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

const insert = (
  article: Article,
  hexagons: Hexagon[],
  x: number,
  y: number,
  coordsCondition: boolean,
  addHex: (hex: Hexagon) => void
): boolean => {
  if (
    article &&
    !hexagons.find((h) => h.x === x && h.y === y) &&
    coordsCondition
  ) {
    addHex({
      id: article.id,
      coverUrl: article.cover.url,
      x: x,
      y: y,
      text: article.title,
    })
    return true
  }
  return false
}

const onDragMove = (
  event: any,
  hexagons: Hexagon[],
  addHex: (hex: Hexagon) => void,
  articles: Article[]
) => {
  const stageX = event.target.getStage().attrs.x // leftmost coordinate of the stage
  const stageY = event.target.getStage().attrs.y // topmost coordinate of the stage

  if (hexagons.length >= articles.length) return
  for (let hexagon of hexagons) {
    let article = articles[hexagons.length]

    // add on the left
    if (
      insert(
        article,
        hexagons,
        hexagon.x - 2 * hr,
        hexagon.y,
        hexagon.x - hr - hg + stageX > 0,
        addHex
      )
    ) {
      break
    }

    // add on the right
    if (
      insert(
        article,
        hexagons,
        hexagon.x + 2 * hr,
        hexagon.y,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH,
        addHex
      )
    ) {
      break
    }

    // add on the top right
    if (
      insert(
        article,
        hexagons,
        hexagon.x + hr,
        hexagon.y - 1.75 * hr,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
          hexagon.y - hr - hg + stageY > 0,
        addHex
      )
    ) {
      break
    }

    // add on the bottom right
    if (
      insert(
        article,
        hexagons,
        hexagon.x + hr,
        hexagon.y + 1.75 * hr,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
          hexagon.y + hr + hg + stageY < CANVAS_HEIGHT,
        addHex
      )
    ) {
      break
    }

    // add on the top left
    if (
      insert(
        article,
        hexagons,
        hexagon.x - hr,
        hexagon.y - 1.75 * hr,
        hexagon.x - hr - hg + stageX > 0 && hexagon.y - hr - hg + stageY > 0,
        addHex
      )
    ) {
      break
    }

    // add on the bottom left
    if (
      insert(
        article,
        hexagons,
        hexagon.x - hr,
        hexagon.y + 1.75 * hr,
        hexagon.x - hr - hg + stageX > 0 &&
          hexagon.y + hr + hg + stageY < CANVAS_HEIGHT,
        addHex
      )
    ) {
      break
    }
  }
}

const stageStyle = {
  background: `linear-gradient(to bottom, ${theme.main.bgPrimary}, ${theme.main.bgSecondary})`,
}

interface CanvasViewProps {
  articles: Article[]
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  const initialHex = {
    id: articles[0].id,
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
    coverUrl: articles[0].cover.url,
    text: articles[0].title,
  }
  const history = useHistory()
  const [images, setImages] = useState<Images>({})
  const [hexagons, setHexagons] = useState<Hexagon[]>([initialHex])

  useEffect(() => {
    const getImg = async () => {
      const lastHex = hexagons[hexagons.length - 1]
      const image = await loadImage(lastHex.coverUrl)
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
        onDragMove={(event) =>
          onDragMove(
            event,
            hexagons,
            (hex: Hexagon) => setHexagons([...hexagons, hex]),
            articles
          )
        }
      >
        <Layer>
          {hexagons.map((hexagon) => (
            <HexArticle
              hexagon={hexagon}
              hexRadius={hr}
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

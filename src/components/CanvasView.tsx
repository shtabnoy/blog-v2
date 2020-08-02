/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import { Stage, Layer, Text, RegularPolygon, Image, Group } from 'react-konva'
import { Spring, animated } from 'react-spring/renderprops-konva'
import theme from '../utils/colors'
import HexArticle from './HexArticle'
import { useHistory } from 'react-router-dom'

const imagesUrl =
  process.env.NODE_ENV === 'development' ? 'http://localhost:1337' : ''

interface Article {
  id: string
  cover: {
    url: string
  }
  title: string
  category: {
    image: {
      url: string
    }
  }
}

interface CanvasViewProps {
  articles: Article[]
}

// Hex radius
const hr = 200

// Hex gap
const hg = 200

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

// opacity step
// TODO: when hex appears make it ease-in-out aminated
// const opacityStep = 0.04

interface Hexagon {
  id: string
  x: number
  y: number
  coverUrl?: string
  text?: string
}

interface Images {
  [id: string]: HTMLImageElement
}

const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = `${imagesUrl}${url}`
    img.onload = (event) => resolve(event.target)
    img.onerror = (err) => reject(err)
  })

const addHex = (
  article: Article,
  hexagons: Hexagon[],
  x: number,
  y: number,
  coordsCondition: boolean,
  setHexagons: React.Dispatch<React.SetStateAction<Hexagon[]>>
): boolean => {
  if (
    article &&
    !hexagons.find((h) => h.x === x && h.y === y) &&
    coordsCondition
  ) {
    const newHex = {
      id: article.id,
      coverUrl: article.cover.url,
      x: x,
      y: y,
      text: article.title,
    }
    setHexagons([...hexagons, newHex])
    return true
  }
  return false
}

const onDragMove = (
  event: any,
  hexagons: Hexagon[],
  setHexagons: React.Dispatch<React.SetStateAction<Hexagon[]>>,
  articles: Article[]
) => {
  const stageX = event.target.getStage().attrs.x
  const stageY = event.target.getStage().attrs.y

  if (hexagons.length >= articles.length) return
  for (let hexagon of hexagons) {
    let toInsert = articles[hexagons.length]

    // add on the left
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x - 2 * hr,
        hexagon.y,
        hexagon.x - hr - hg + stageX > 0,
        setHexagons
      )
    ) {
      break
    }

    // add on the right
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x + 2 * hr,
        hexagon.y,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH,
        setHexagons
      )
    ) {
      break
    }

    // add on the top right
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x + hr,
        hexagon.y - 1.75 * hr,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
          hexagon.y - hr - hg + stageY > 0,
        setHexagons
      )
    ) {
      break
    }

    // add on the bottom right
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x + hr,
        hexagon.y + 1.75 * hr,
        hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
          hexagon.y + hr + hg + stageY < CANVAS_HEIGHT,
        setHexagons
      )
    ) {
      break
    }

    // add on the top left
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x - hr,
        hexagon.y - 1.75 * hr,
        hexagon.x - hr - hg + stageX > 0 && hexagon.y - hr - hg + stageY > 0,
        setHexagons
      )
    ) {
      break
    }

    // add on the bottom left
    if (
      addHex(
        toInsert,
        hexagons,
        hexagon.x - hr,
        hexagon.y + 1.75 * hr,
        hexagon.x - hr - hg + stageX > 0 &&
          hexagon.y + hr + hg + stageY < CANVAS_HEIGHT,
        setHexagons
      )
    ) {
      break
    }
  }
}

const stageStyle = {
  background: `linear-gradient(to bottom, ${theme.main.bgPrimary}, ${theme.main.bgSecondary})`,
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  const history = useHistory()
  const [images, setImages] = useState<Images>({})
  const [hexagons, setHexagons] = useState<Hexagon[]>([
    {
      id: articles[0].id,
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      coverUrl: articles[0].cover.url,
      text: articles[0].title,
    },
  ])

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
          onDragMove(event, hexagons, setHexagons, articles)
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

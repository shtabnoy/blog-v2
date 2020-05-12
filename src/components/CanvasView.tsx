/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import {
  Stage,
  Layer,
  Rect,
  Text,
  RegularPolygon,
  Image,
  Group,
} from 'react-konva'

const baseUrl = 'http://localhost:1337' // TODO: make it dependable on .env

interface Point {
  x: number
  y: number
}

interface Hexs {
  [key: string]: Point
}

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

// Scale step
const scaleStep = 0.015

// Hex gap
const hg = 200

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

// opacity step
const opacityStep = 0.04

// colors
// palette 1
// const background = '#af8baf'
// const primary = '#f6acc8'
// const secondary = '#584153'
// const shadowColor = '#26191b'

// palette 2
// const background = '#649d66'
// const primary = '#f6f578'
// const secondary = '#f6d743'
// const shadowColor = '#06623b'

// palette night theme 1
// const background = '#27496d'
// const primary = '#00a8cc'
// const secondary = '#0c7b93'
// const shadowColor = '#142850'

// palette 3
// const background = '#effcef'
// const primary = '#ccedd2'
// const secondary = '#94d3ac'
// const shadowColor = '#588569'

// const grad1 = '#00ccff'
// const grad2 = '#fdfd1e'
// const grad1 = '#4fb0cf'
// const grad2 = '#9341f6'
const grad1 = '#4456D6'
const grad2 = '#D931BA'
const backgroundGrad1 = '#3542A8'
const backgroundGrad2 = '#841E71'
const shadowColor = '#100d23'

interface Hexagon {
  id: string
  x: number
  y: number
  coverUrl?: string
}

interface Hexagons {
  [id: string]: Hexagon
}

interface Images {
  [id: string]: HTMLImageElement
}

const loadImage = (url: string) =>
  new Promise((resolve, reject) => {
    const img = new window.Image()
    img.src = `${baseUrl}${url}`
    img.onload = (event) => resolve(event.target)
    img.onerror = (err) => reject(err)
  })

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  // TODO: Preload all images into a hashmap
  // and switch to a hashmap for hexagons with a key ${x}${y}
  const [images, setImages] = useState<Images>({})
  const [hexagons, setHexagons] = useState<Hexagon[]>([
    {
      id: articles[0].id,
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT / 2,
      coverUrl: articles[0].cover.url,
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
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          background: `linear-gradient(to bottom, ${backgroundGrad1}, ${backgroundGrad2})`,
        }}
        draggable
        onDragMove={(event) => {
          const stageX = event.target.getStage().attrs.x
          const stageY = event.target.getStage().attrs.y

          if (hexagons.length >= articles.length) return
          for (let hexagon of hexagons) {
            let toInsert = articles[hexagons.length]

            // add on the left
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x - 2 * hr && h.y === hexagon.y
              ) &&
              hexagon.x - hr - hg + stageX > 0
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x - 2 * hr,
                y: hexagon.y,
              }
              setHexagons([...hexagons, newHex])
              break
            }

            // add on the right
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x + 2 * hr && h.y === hexagon.y
              ) &&
              hexagon.x + hr + hg + stageX < CANVAS_WIDTH
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x + 2 * hr,
                y: hexagon.y,
              }
              setHexagons([...hexagons, newHex])
              break
            }

            // add on the top right
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x + hr && h.y === hexagon.y - 1.75 * hr
              ) &&
              hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
              hexagon.y - hr - hg + stageY > 0
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x + hr,
                y: hexagon.y - 1.75 * hr,
              }
              setHexagons([...hexagons, newHex])
              break
            }

            // add on the bottom right
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x + hr && h.y === hexagon.y + 1.75 * hr
              ) &&
              hexagon.x + hr + hg + stageX < CANVAS_WIDTH &&
              hexagon.y + hr + hg + stageY < CANVAS_HEIGHT
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x + hr,
                y: hexagon.y + 1.75 * hr,
              }
              setHexagons([...hexagons, newHex])
              break
            }

            // add on the top left
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x - hr && h.y === hexagon.y - 1.75 * hr
              ) &&
              hexagon.x - hr - hg + stageX > 0 &&
              hexagon.y - hr - hg + stageY > 0
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x - hr,
                y: hexagon.y - 1.75 * hr,
              }
              setHexagons([...hexagons, newHex])
              break
            }

            // add on the bottom left
            if (
              toInsert &&
              !hexagons.find(
                (h) => h.x === hexagon.x - hr && h.y === hexagon.y + 1.75 * hr
              ) &&
              hexagon.x - hr - hg + stageX > 0 &&
              hexagon.y + hr + hg + stageY < CANVAS_HEIGHT
            ) {
              const newHex = {
                id: articles[hexagons.length].id,
                coverUrl: articles[hexagons.length].cover.url,
                x: hexagon.x - hr,
                y: hexagon.y + 1.75 * hr,
              }
              setHexagons([...hexagons, newHex])
              break
            }
          }
        }}
      >
        <Layer>
          {hexagons.map((hexagon) => (
            <Group key={hexagon.id} x={hexagon.x} y={hexagon.y}>
              <RegularPolygon
                radius={hr}
                sides={6}
                stroke="rgba(255,255,255,0.9)"
                fillLinearGradientStartPoint={{
                  x: 0,
                  y: -hr,
                }}
                fillLinearGradientEndPoint={{
                  x: 0,
                  y: hr,
                }}
                fillLinearGradientColorStops={[0.3, grad1, 1, grad2]}
              />
              {images[hexagon.id] && (
                <Image
                  offset={{
                    x: Number(images[hexagon.id].width) / 2,
                    y: Number(images[hexagon.id].width) / 2,
                  }}
                  image={images[hexagon.id]}
                />
              )}
            </Group>
          ))}
        </Layer>
      </Stage>
    </React.Fragment>
  )
}

export default CanvasView

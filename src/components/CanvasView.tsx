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
import Konva from 'konva'

const baseUrl = 'http://localhost:1337' // TODO: make it dependable on .env

interface Point {
  x: number
  y: number
}

interface Hexs {
  [key: string]: Point
}

interface Article {
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

// const onHexEnter = (group: paper.Group) => {
//   // paper.view.
//   document.body.style.cursor = 'pointer'
//   let scale = 1
//   group.applyMatrix = false

//   let hex = group.lastChild
//   // hex.strokeColor = new paper.Color(secondary)
//   // hex.strokeWidth = 4

//   shadow = new paper.Path.RegularPolygon(group.position, 6, hr)
//   shadow.applyMatrix = false
//   shadow.shadowColor = new paper.Color(shadowColor)
//   shadow.shadowBlur = 14
//   shadow.shadowOffset = new paper.Point(12, 10)
//   shadow.fillColor = new paper.Color(shadowColor)
//   shadow.sendToBack()

//   group.onFrame = () => {
//     if (scale >= 1.1) {
//       group.onFrame = undefined
//       return
//     }
//     scale += scaleStep
//     group.scaling = new paper.Point(scale, scale)
//     shadow.scaling = new paper.Point(scale, scale)
//   }
// }

// const onHexLeave = (group: paper.Group) => {
//   document.body.style.cursor = 'default'
//   let scale = 1.1
//   group.applyMatrix = false
//   // let hex = group.lastChild
//   // hex.strokeColor = new paper.Color(secondary)
//   // hex.strokeWidth = 0
//   group.onFrame = () => {
//     if (scale <= 1) {
//       group.onFrame = undefined
//       return
//     }
//     scale -= scaleStep
//     group.scaling = new paper.Point(scale, scale)
//   }
//   shadow.remove()
// }

// const importSvg = (url: string): Promise<paper.Item> => {
//   return new Promise((resolve, reject) => {
//     paper.project.importSVG(url, {
//       onLoad: (item: paper.Item) => {
//         resolve(item)
//       },
//       onError: (error: any) => {
//         reject(error)
//       },
//     })
//   })
// }

// const createHex = async (c: Point, article: Article) => {
//   const { cover, category, title } = article
//   const catPlaceholder = await importSvg(`<svg></svg>`)
//   let covImg = null
//   let catImg = null
//   try {
//     covImg =
//       cover && cover.url
//         ? await importSvg(`${baseUrl}${article.cover.url}`)
//         : catPlaceholder
//   } catch (error) {
//     console.log('Error loading cover image:', error)
//   }

//   try {
//     catImg =
//       category && category.image && category.image.url
//         ? await importSvg(`${baseUrl}${category.image && category.image.url}`)
//         : catPlaceholder
//   } catch (error) {
//     console.log('Error loading category image:', error)
//   }

//   const p = new paper.Point(c.x, c.y)
//   const h = new paper.Path.RegularPolygon(p, 6, hr)

//   covImg.position = p
//   catImg.position = new paper.Point(p.x, p.y + 150)
//   const titleText = new paper.PointText(new paper.Point(p.x, p.y - 80))
//   titleText.content = title
//   titleText.fontFamily = 'Comfortaa'
//   titleText.justification = 'center'
//   titleText.fontSize = 18
//   titleText.fillColor = new paper.Color('#fff')
//   const group = new paper.Group([titleText, covImg, catImg, h])
//   h.fillColor = {
//     gradient: {
//       stops: [
//         [grad1, 0.3],
//         [grad2, 1],
//       ],
//       radial: false,
//     },
//     origin: h.bounds.topCenter,
//     destination: h.bounds.bottomCenter,
//   } as any
//   h.strokeColor = new paper.Color('white')
//   h.strokeWidth = 2
//   h.blendMode = 'destination-atop'
//   group.opacity = 0
//   group.onMouseEnter = () => onHexEnter(group)
//   group.onMouseLeave = () => onHexLeave(group)
// }

// const createCategoryHex = async (c: Point) => {
//   const r = 50
//   const p = new paper.Point(c.x - r, c.y + r)
//   const h = new paper.Path.RegularPolygon(p, 6, r)

//   h.fillColor = {
//     gradient: {
//       stops: [
//         [grad1, 0.3],
//         [grad2, 1],
//       ],
//       radial: false,
//     },
//     origin: h.bounds.topCenter,
//     destination: h.bounds.bottomCenter,
//   } as any
//   h.strokeColor = new paper.Color('white')
//   h.strokeWidth = 2
//   h.name = 'categoryHex'
// }

// const spaceOnTheLeft = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x - 2 * hr}:${p.y}`] && p.x - hr - hg > 0 + paper.view.bounds.x
//   )
// }

// const spaceOnTheRight = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x + 2 * hr}:${p.y}`] &&
//     p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x
//   )
// }

// const spaceOnTheTopRight = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x + hr}:${p.y - 1.75 * hr}`] &&
//     p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
//     p.y - hr - hg > 0 + paper.view.bounds.y
//   )
// }

// const spaceOnTheBottomRight = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x + hr}:${p.y + 1.75 * hr}`] &&
//     p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
//     p.y + hr + hg < CANVAS_HEIGHT + paper.view.bounds.y
//   )
// }

// const spaceOnTheTopLeft = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x - hr}:${p.y - 1.75 * hr}`] &&
//     p.x - hr - hg > 0 + paper.view.bounds.x &&
//     p.y - hr - hg > 0 + paper.view.bounds.y
//   )
// }

// const spaceOnTheBottomLeft = (hexs: Hexs, p: Point) => {
//   return (
//     !hexs[`${p.x - hr}:${p.y + 1.75 * hr}`] &&
//     p.x - hr - hg > 0 + paper.view.bounds.x &&
//     p.y + hr + hg < CANVAS_HEIGHT + paper.view.bounds.y
//   )
// }

// const checkAndAddHexes = (hexs: Hexs, articles: Article[]) => {
//   const len = Object.keys(hexs).length
//   if (len >= articles.length) return
//   Object.values(hexs).forEach((p) => {
//     if (spaceOnTheLeft(hexs, p)) {
//       const c = { x: p.x - 2 * hr, y: p.y }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//     if (spaceOnTheRight(hexs, p)) {
//       const c = { x: p.x + 2 * hr, y: p.y }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//     if (spaceOnTheTopRight(hexs, p)) {
//       const c = { x: p.x + hr, y: p.y - 1.75 * hr }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//     if (spaceOnTheBottomRight(hexs, p)) {
//       const c = { x: p.x + hr, y: p.y + 1.75 * hr }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//     if (spaceOnTheTopLeft(hexs, p)) {
//       const c = { x: p.x - hr, y: p.y - 1.75 * hr }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//     if (spaceOnTheBottomLeft(hexs, p)) {
//       const c = { x: p.x - hr, y: p.y + 1.75 * hr }
//       const len = Object.keys(hexs).length
//       if (articles[len]) {
//         createHex(c, articles[len])
//         hexs[`${c.x}:${c.y}`] = c
//       }
//     }
//   })
// }

// /** Dragging */
// const setupDragging = (onDrag: () => void) => {
//   var toolPan = new paper.Tool()
//   toolPan.activate()
//   toolPan.onMouseDrag = function (event: any) {
//     let delta = event.downPoint.subtract(event.point) as number
//     ;(paper.view as any).scrollBy(delta)

//     onDrag()
//   }
// }

interface Image {
  width: number
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  const [image, setImage] = useState<CanvasImageSource>(null)

  useEffect(() => {
    const url = articles[0].cover.url
    const img = new window.Image()
    img.src = `${baseUrl}${url}`
    img.onload = () => setImage(img)
  }, [])

  const iHexCoords = {
    x: CANVAS_WIDTH / 2,
    y: CANVAS_HEIGHT / 2,
  }

  return (
    <React.Fragment>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        style={{
          background: `linear-gradient(to bottom, ${backgroundGrad1}, ${backgroundGrad2})`,
        }}
      >
        <Layer>
          <Group x={iHexCoords.x} y={iHexCoords.y}>
            <RegularPolygon
              radius={200}
              sides={6}
              fillLinearGradientStartPoint={{
                x: 0,
                y: -200,
              }}
              fillLinearGradientEndPoint={{
                x: 0,
                y: 200,
              }}
              fillLinearGradientColorStops={[0.3, grad1, 1, grad2]}
            />
            {image && (
              <Image
                offset={{
                  x: Number(image.width) / 2,
                  y: Number(image.width) / 2,
                }}
                image={image}
              />
            )}
          </Group>
        </Layer>
      </Stage>
    </React.Fragment>
  )
}

export default CanvasView

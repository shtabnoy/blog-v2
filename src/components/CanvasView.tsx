/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect } from 'react'
import paper from 'paper'

const baseUrl = 'http://localhost:1337' // TODO: make it dependable on .env

interface Point {
  x: number
  y: number
}

// interface Hex {
//   coords: Point
// right: boolean
// left: boolean
// bottomRight: boolean
// bottomLeft: boolean
// topRight: boolean
// topLeft: boolean
// }

interface Hexs {
  [key: string]: Point
}

interface CanvasViewProps {
  articles: any[]
}

const createHex = (coords: Point) => {
  const hex = {
    coords: coords,
    // right: false,
    // left: false,
    // bottomRight: false,
    // bottomLeft: false,
    // topRight: false,
    // topLeft: false,
  }
  return hex
}

// Hex radius
const hr = 200

// Scale step
const step = 0.015

// Hex gap
const hg = 200

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

// fadeIn time
const fadeInTime = 400

const onHexEnter = (group: any) => {
  let scale = 1
  group.applyMatrix = false
  group.onFrame = () => {
    if (scale >= 1.1) {
      group.onFrame = undefined
      // shadow = new paper.Path.RegularPolygon(group.position, 6, hr * 1.1)
      // shadow.shadowColor = '#e024fb'
      // shadow.shadowBlur = 10
      // shadow.strokeWidth = 4
      // shadow.strokeColor = '#f7d3ff'
      return
    }
    scale += step
    group.scaling = scale
  }
}

const onHexLeave = (group: any) => {
  let scale = 1.1
  group.applyMatrix = false
  group.onFrame = () => {
    if (scale <= 1) {
      group.onFrame = undefined
      return
    }
    scale -= step
    group.scaling = scale
  }
  // shadow.remove()
}

const fadeIn = (x: number, y: number) => {
  const h = new paper.Path.RegularPolygon(new paper.Point(x, y), 6, hr)
  // h.position.x
  h.fillColor = ('white' as unknown) as paper.Color // ??? wtf
  let tween = h.tweenTo(
    { fillColor: '#e9e9ff' },
    { duration: fadeInTime, start: false }
  )
  tween.start()
  h.onMouseEnter = () => onHexEnter(h)
  h.onMouseLeave = () => onHexLeave(h)
}

const spaceOnTheLeft = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x - 2 * hr}:${p.y}`] && p.x - hr - hg > 0 + paper.view.bounds.x
  )
}

const spaceOnTheRight = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x + 2 * hr}:${p.y}`] &&
    p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x
  )
}

const spaceOnTheTopRight = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x + hr}:${p.y - 1.75 * hr}`] &&
    p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
    p.y - hr - hg > 0 + paper.view.bounds.y
  )
}

const spaceOnTheBottomRight = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x + hr}:${p.y + 1.75 * hr}`] &&
    p.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
    p.y + hr + hg < CANVAS_HEIGHT + paper.view.bounds.y
  )
}

const spaceOnTheTopLeft = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x - hr}:${p.y - 1.75 * hr}`] &&
    p.x - hr - hg > 0 + paper.view.bounds.x &&
    p.y - hr - hg > 0 + paper.view.bounds.y
  )
}

const spaceOnTheBottomLeft = (hexs: Hexs, p: Point) => {
  return (
    !hexs[`${p.x - hr}:${p.y + 1.75 * hr}`] &&
    p.x - hr - hg > 0 + paper.view.bounds.x &&
    p.y + hr + hg < CANVAS_HEIGHT + paper.view.bounds.y
  )
}

/** Dragging */
const setupDragging = (hexs: Hexs, limit: number) => {
  var toolPan = new paper.Tool()
  toolPan.activate()
  toolPan.onMouseDrag = function (event: any) {
    let delta = event.downPoint.subtract(event.point) as number
    ;(paper.view as any).scrollBy(delta)

    if (limit <= 0) return
    Object.values(hexs).forEach((p) => {
      if (
        spaceOnTheLeft(hexs, p)
        // !hex.left &&
        // !hexs[`${hex.coords.x - 2 * hr}:${hex.coords.y}`] &&
        // hex.coords.x - hr - hg > 0 + paper.view.bounds.x
      ) {
        // const newHex = createHex({ x: hex.coords.x - 2 * hr, y: hex.coords.y })
        // newHex.right = true
        let x = p.x - 2 * hr
        let y = p.y
        hexs[`${x}:${y}`] = { x, y }
        // hex.left = true
        fadeIn(x, y)
        limit--
        // if (limit <= 0) return
      } else if (
        spaceOnTheRight(hexs, p)
        // !hex.right &&
        // !hexs[`${hex.coords.x + 2 * hr}:${hex.coords.y}`] &&
        // hex.coords.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x
      ) {
        let x = p.x + 2 * hr
        let y = p.y
        // const newHex = createHex({ x: p.x + 2 * hr, y: p.y })
        // newHex.left = true
        hexs[`${x}:${y}`] = { x, y }
        // hex.right = true
        fadeIn(x, y)
        limit--
        // if (limit <= 0) return
      } else if (
        spaceOnTheTopRight(hexs, p)
        // !hex.topRight &&
        // !hexs[`${hex.coords.x + hr}:${hex.coords.y - 1.75 * hr}`] &&
        // hex.coords.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
        // hex.coords.y - hr - hg > 0 + paper.view.bounds.y
      ) {
        // const newHex = createHex({
        //   x: hex.coords.x + hr,
        //   y: hex.coords.y - 1.75 * hr,
        // })
        let x = p.x + hr
        let y = p.y - 1.75 * hr
        // newHex.bottomLeft = true
        hexs[`${x}:${y}`] = { x, y }
        // hex.topRight = true
        fadeIn(x, y)
        limit--
        // if (limit <= 0) return
      } else if (
        spaceOnTheBottomRight(hexs, p)
        // !hex.bottomRight &&
        // !hexs[`${hex.coords.x + hr}:${hex.coords.y + 1.75 * hr}`] &&
        // hex.coords.x + hr + hg < CANVAS_WIDTH + paper.view.bounds.x &&
        // hex.coords.y + hr + hg < CANVAS_HEIGHT + paper.view.bounds.y
      ) {
        // const newHex = createHex({
        //   x: hex.coords.x + hr,
        //   y: hex.coords.y + 1.75 * hr,
        // })
        let x = p.x + hr
        let y = p.y + 1.75 * hr
        // newHex.topLeft = true
        hexs[`${x}:${y}`] = { x, y }
        // hex.bottomRight = true
        fadeIn(x, y)
        limit--
        // if (limit <= 0) return
      } else if (spaceOnTheTopLeft(hexs, p)) {
        let x = p.x - hr
        let y = p.y - 1.75 * hr
        // newHex.topLeft = true
        hexs[`${x}:${y}`] = { x, y }
        // hex.bottomRight = true
        fadeIn(x, y)
        limit--
      } else if (spaceOnTheBottomLeft(hexs, p)) {
        let x = p.x - hr
        let y = p.y + 1.75 * hr
        // newHex.topLeft = true
        hexs[`${x}:${y}`] = { x, y }
        // hex.bottomRight = true
        fadeIn(x, y)
        limit--
      }
    })
  }
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  // console.log(articles)
  useEffect(() => {
    // Setup canvas and paper
    const canvas = document.getElementById('canvas-view') as HTMLCanvasElement
    canvas.width = CANVAS_WIDTH
    canvas.height = CANVAS_HEIGHT
    canvas.style.width = `${CANVAS_WIDTH}px`
    canvas.style.height = `${CANVAS_HEIGHT}px`
    paper.setup(canvas)

    // Initial hex coords (center of the screeen)
    const xc = CANVAS_WIDTH / 2
    const yc = CANVAS_HEIGHT / 2

    // All the hexes stored in map
    const hexs: Hexs = {}

    // Initial hex
    const h1 = createHex({ x: xc, y: yc })
    hexs[`${xc}:${yc}`] = { x: xc, y: yc }

    // Limit of articles left to show
    // Now -1 is is due to the first hex already created
    // TODO: show more hexes initially
    let limit = articles.length - 1

    const hPos = new paper.Point(h1.coords.x, h1.coords.y)

    // Picture for the initial hex
    let sampleUrl = `${baseUrl}${articles[0].cover.url}`
    // console.log(sampleUrl)
    const raster = new paper.Raster(sampleUrl)
    raster.position = hPos

    // Hex on the paper
    const h = new paper.Path.RegularPolygon(hPos, 6, hr)
    h.fillColor = ('#e9e9ff' as unknown) as paper.Color // ??? wtf
    h.clipMask = true
    let group = new paper.Group([raster, h])
    group.onMouseEnter = () => onHexEnter(group)
    group.onMouseLeave = () => onHexLeave(group)

    setupDragging(hexs, limit)
  })

  return (
    <React.Fragment>
      <canvas id="canvas-view"></canvas>
    </React.Fragment>
  )
}

export default CanvasView

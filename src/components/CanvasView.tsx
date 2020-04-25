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

const createHex = (c: Point) => {
  const h = new paper.Path.RegularPolygon(new paper.Point(c.x, c.y), 6, hr)
  h.fillColor = ('white' as unknown) as paper.Color // ??? wtf
  h.onMouseEnter = () => onHexEnter(h)
  h.onMouseLeave = () => onHexLeave(h)
  fadeIn(h)
}

const fadeIn = (h: paper.Path.RegularPolygon) => {
  let tween = h.tweenTo(
    { fillColor: '#e9e9ff' },
    { duration: fadeInTime, start: false }
  )
  tween.start()
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
      if (spaceOnTheLeft(hexs, p)) {
        const c = { x: p.x - 2 * hr, y: p.y }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
        limit--
        // if (limit <= 0) return
      } else if (spaceOnTheRight(hexs, p)) {
        const c = { x: p.x + 2 * hr, y: p.y }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
        limit--
        // if (limit <= 0) return
      } else if (spaceOnTheTopRight(hexs, p)) {
        const c = { x: p.x + hr, y: p.y - 1.75 * hr }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
        limit--
        // if (limit <= 0) return
      } else if (spaceOnTheBottomRight(hexs, p)) {
        const c = { x: p.x + hr, y: p.y + 1.75 * hr }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
        limit--
        // if (limit <= 0) return
      } else if (spaceOnTheTopLeft(hexs, p)) {
        const c = { x: p.x - hr, y: p.y - 1.75 * hr }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
        limit--
      } else if (spaceOnTheBottomLeft(hexs, p)) {
        const c = { x: p.x - hr, y: p.y + 1.75 * hr }
        hexs[`${c.x}:${c.y}`] = c
        createHex(c)
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
    const cx = CANVAS_WIDTH / 2
    const cy = CANVAS_HEIGHT / 2

    // All the hexes stored in map
    const hexs: Hexs = {}

    // Initial hex
    // TODO: consider change hexs values to paper.Point
    const hPos = new paper.Point(cx, cy)
    hexs[`${cx}:${cy}`] = { x: cx, y: cy }

    // Limit of articles left to show
    // Now -1 is is due to the first hex already created
    // TODO: show more hexes initially
    let limit = articles.length - 1

    // Picture for the initial hex
    let sampleUrl = `${baseUrl}${articles[0].cover.url}`
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

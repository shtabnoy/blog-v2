/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { useEffect, useState } from 'react'
import paper from 'paper'

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
}

interface CanvasViewProps {
  articles: Article[]
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

const createHex = (c: Point, articleUrl: string) => {
  const p = new paper.Point(c.x, c.y)
  const h = new paper.Path.RegularPolygon(p, 6, hr)

  // Picture for the initial hex
  const sampleUrl = `${baseUrl}${articleUrl}`
  const raster = new paper.Raster(sampleUrl)
  raster.position = p

  // Hex on the paper
  // const h = new paper.Path.RegularPolygon(hPos, 6, hr)
  // h.fillColor = ('#e9e9ff' as unknown) as paper.Color // ??? wtf
  h.clipMask = true
  let group = new paper.Group([raster, h])
  group.onMouseEnter = () => onHexEnter(group)
  group.onMouseLeave = () => onHexLeave(group)
  // fadeIn(h)
}

const fadeIn = (h: paper.Path.RegularPolygon) => {
  // TODO: animate opacity of the picture from 0 to 1
  // let tween = h.tweenTo(
  //   { fillColor: '#e9e9ff' },
  //   { duration: fadeInTime, start: false }
  // )
  // tween.start()
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

const checkAndAddHexes = (hexs: Hexs, articles: Article[]) => {
  const len = Object.keys(hexs).length
  if (len >= articles.length) return
  Object.values(hexs).forEach((p) => {
    // console.log(hexs, p)

    if (spaceOnTheLeft(hexs, p)) {
      // console.log('left')
      const c = { x: p.x - 2 * hr, y: p.y }
      // TODO: articles[len].cover.url is unsafe
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    } else if (spaceOnTheRight(hexs, p)) {
      // console.log('right')
      const c = { x: p.x + 2 * hr, y: p.y }
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    } else if (spaceOnTheTopRight(hexs, p)) {
      // console.log('topright')
      const c = { x: p.x + hr, y: p.y - 1.75 * hr }
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    } else if (spaceOnTheBottomRight(hexs, p)) {
      // console.log('bottomright')
      const c = { x: p.x + hr, y: p.y + 1.75 * hr }
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    } else if (spaceOnTheTopLeft(hexs, p)) {
      // console.log('topleft')
      const c = { x: p.x - hr, y: p.y - 1.75 * hr }
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    } else if (spaceOnTheBottomLeft(hexs, p)) {
      // console.log('bottomleft')
      const c = { x: p.x - hr, y: p.y + 1.75 * hr }
      createHex(c, articles[Object.keys(hexs).length].cover.url)
      hexs[`${c.x}:${c.y}`] = c
    }
  })
}

/** Dragging */
const setupDragging = (onDrag: () => void) => {
  var toolPan = new paper.Tool()
  toolPan.activate()
  toolPan.onMouseDrag = function (event: any) {
    let delta = event.downPoint.subtract(event.point) as number
    ;(paper.view as any).scrollBy(delta)

    onDrag()
  }
}

const CanvasView: React.FC<CanvasViewProps> = ({ articles }) => {
  // console.log(articles.map((a) => a.cover.url))
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
    const pos = { x: cx, y: cy }
    hexs[`${cx}:${cy}`] = pos

    createHex(pos, articles[0].cover.url)
    checkAndAddHexes(hexs, articles)

    setupDragging(() => checkAndAddHexes(hexs, articles))
  }, [])

  return (
    <React.Fragment>
      <canvas id="canvas-view"></canvas>
    </React.Fragment>
  )
}

export default CanvasView

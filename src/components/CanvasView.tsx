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
const scaleStep = 0.015

// Hex gap
const hg = 200

// canvas dimensions
const CANVAS_WIDTH = window.innerWidth
const CANVAS_HEIGHT = window.innerHeight

// opacity step
const opacityStep = 0.04

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
    scale += scaleStep
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
    scale -= scaleStep
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

  h.clipMask = true
  let group = new paper.Group([raster, h])
  group.opacity = 0
  group.onMouseEnter = () => onHexEnter(group)
  group.onMouseLeave = () => onHexLeave(group)
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
    if (spaceOnTheLeft(hexs, p)) {
      const c = { x: p.x - 2 * hr, y: p.y }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
    }
    if (spaceOnTheRight(hexs, p)) {
      const c = { x: p.x + 2 * hr, y: p.y }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
    }
    if (spaceOnTheTopRight(hexs, p)) {
      const c = { x: p.x + hr, y: p.y - 1.75 * hr }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
    }
    if (spaceOnTheBottomRight(hexs, p)) {
      const c = { x: p.x + hr, y: p.y + 1.75 * hr }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
    }
    if (spaceOnTheTopLeft(hexs, p)) {
      const c = { x: p.x - hr, y: p.y - 1.75 * hr }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
    }
    if (spaceOnTheBottomLeft(hexs, p)) {
      const c = { x: p.x - hr, y: p.y + 1.75 * hr }
      const len = Object.keys(hexs).length
      if (articles[len]) {
        createHex(c, articles[Object.keys(hexs).length].cover.url)
        hexs[`${c.x}:${c.y}`] = c
      }
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

    paper.view.onFrame = () => {
      // fade in every new element
      paper.project.activeLayer.children.forEach((child) => {
        if (child.opacity >= 1) {
          return
        }
        child.opacity += opacityStep
      })
    }
  }, [])

  return (
    <React.Fragment>
      <canvas id="canvas-view"></canvas>
    </React.Fragment>
  )
}

export default CanvasView

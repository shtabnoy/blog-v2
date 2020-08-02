/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Spring, animated } from 'react-spring/renderprops-konva'
import { HexArticle } from '../types'
import HexText from './HexText'
import Hex from './Hex'
import HexImage from './HexImage'

const scaleUp = (event: any) => {
  // TODO: don't trigger on all children elements
  // currentTarget is the group
  // target is a child
  event.currentTarget.to({
    scaleX: 1.1,
    scaleY: 1.1,
    duration: 0.1,
  })
  const hex = event.currentTarget.children[0]
  hex.setShadowColor('black')
  hex.setShadowBlur(10)
  hex.setShadowOffset({ x: 10, y: 10 })
  hex.setShadowOpacity(0.5)

  // cursor: pointer
  const container = event.target.getStage().container()
  container.style.cursor = 'pointer'
}

const scaleDown = (event: any) => {
  event.currentTarget.to({
    scaleX: 1,
    scaleY: 1,
    duration: 0.1,
  })
  const hex = event.currentTarget.children[0]
  hex.setShadowColor('black')
  hex.setShadowBlur(0)
  hex.setShadowOffset({ x: 0, y: 0 })
  hex.setShadowOpacity(0)

  // cursor: default
  const container = event.target.getStage().container()
  container.style.cursor = 'default'
}

// TODO: make common scale function

interface HexArticleProps {
  hexagon: HexArticle
  hexRadius: number
  image?: HTMLImageElement
  history: any
}

const HexArticle: React.FC<HexArticleProps> = ({
  hexagon,
  hexRadius,
  image,
  history,
}) => {
  return (
    <Spring key={hexagon.id} from={{ opacity: 0 }} to={{ opacity: 1 }}>
      {(props: any) => (
        <animated.Group
          {...props}
          x={hexagon.x}
          y={hexagon.y}
          key={hexagon.id}
          onMouseOver={scaleUp}
          onMouseOut={scaleDown}
          onClick={() => {
            history.push(`/articles/${hexagon.id}`)
          }}
        >
          <Hex radius={hexRadius} />
          {hexagon.text && (
            <HexText text={hexagon.text} hexRadius={hexRadius} />
          )}
          {image && <HexImage image={image} />}
        </animated.Group>
      )}
    </Spring>
  )
}

export default HexArticle

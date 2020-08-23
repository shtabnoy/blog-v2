/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
// import { Spring, animated } from 'react-spring/renderprops-konva'
import { Article, Hexagon } from '../types'
// import HexText from './HexText'
// import Hex from './Hex'
// import HexImage from './HexImage'

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

  const container = event.target.getStage().container()
  container.style.cursor = 'default'
}

interface HexArticleProps {
  hexagon: Hexagon
  article: Article
  image?: HTMLImageElement
  history: any
}

const HexArticle: React.FC<HexArticleProps> = ({
  hexagon,
  article,
  image,
  history,
}) => {
  return (
    <div></div>
    // <Spring key={hexagon.id} from={{ opacity: 0 }} to={{ opacity: 1 }}>
    //   {(props: any) => (
    //     <animated.Group
    //       {...props}
    //       x={hexagon.x}
    //       y={hexagon.y}
    //       key={hexagon.id}
    //       onMouseOver={scaleUp}
    //       onMouseOut={scaleDown}
    //       onClick={() => {
    //         history.push(`/articles/${hexagon.id}`)
    //       }}
    //     >
    //       <Hex radius={hexagon.radius} />
    //       {article.title && (
    //         <HexText text={article.title} hexRadius={hexagon.radius} />
    //       )}
    //       {image && <HexImage image={image} />}
    //     </animated.Group>
    //   )}
    // </Spring>
  )
}

export default HexArticle

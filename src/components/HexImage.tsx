/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Image } from 'react-konva'

interface HexImageProps {
  image: HTMLImageElement
}

const HexImage: React.FC<HexImageProps> = ({ image }) => {
  return (
    <Image
      offset={{
        x: Number(image.width) / 2,
        y: Number(image.width) / 2,
      }}
      image={image}
    />
  )
}

export default HexImage

/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { Text } from 'react-konva'

interface HexTextProps {
  text: string
  hexRadius: number
}

const HexText: React.FC<HexTextProps> = ({ text, hexRadius }) => {
  return (
    <Text
      text={text}
      fontSize={18}
      width={2 * hexRadius}
      offsetY={90}
      offsetX={hexRadius}
      align={'center'}
      fill={'white'}
    />
  )
}

export default HexText

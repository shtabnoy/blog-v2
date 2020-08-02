/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { RegularPolygon } from 'react-konva'
import theme from '../utils/colors'

interface HexProps {
  radius: number
}

const Hex: React.FC<HexProps> = ({ radius }) => {
  return (
    <RegularPolygon
      radius={radius}
      sides={6}
      stroke="rgba(255,255,255,0.9)"
      fillLinearGradientStartPoint={{
        x: 0,
        y: -radius,
      }}
      fillLinearGradientEndPoint={{
        x: 0,
        y: radius,
      }}
      fillLinearGradientColorStops={[
        0.3,
        theme.main.primary,
        1,
        theme.main.secondary,
      ]}
    />
  )
}

export default Hex

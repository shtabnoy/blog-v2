import React from 'react'
import theme from '../utils/colors'
import styled from '@emotion/styled'

const CategoryIconGroup = styled.g`
  transform: translate(calc(50% - 22px), 80%);
  fill: rgba(0, 0, 0, 0);
  stroke-width: 2;
  path {
    fill: rgba(255, 255, 255, 0.7);
    transition: all 0.5s;
  }
  polygon {
    stroke: rgba(255, 255, 255, 0.7);
    transition: all 0.5s;
  }
  &:hover polygon {
    fill: rgba(255, 255, 255, 0.7);
  }
  &:hover path {
    fill: ${theme.main.secondary};
  }
`

interface CategoryIconProps {
  iconPath: string
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ iconPath }) => {
  return (
    <CategoryIconGroup>
      <polygon points="43.3,38 22.1,50.2 1,38 1,13.5 22.1,1.2 43.3,13.5" />
      <path d={iconPath} />
    </CategoryIconGroup>
  )
}

export default CategoryIcon

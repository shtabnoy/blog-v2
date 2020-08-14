import React from 'react'
import theme from '../utils/colors'
import styled from '@emotion/styled'

const CategoryIconGroup = styled.g`
  transform: translate(calc(50% - 22px), 80%);
  fill: ${theme.main.bgPrimary};
  stroke-width: 2;
  circle,
  line {
    stroke-linecap: round;
    stroke: white;
  }
  path {
    fill: white;
  }
  polygon {
    stroke: none;
  }
  &:hover polygon {
    stroke: white;
  }
`

interface CategoryIconProps {
  name: string
}

const CategoryIcon: React.FC<CategoryIconProps> = ({ name }) => {
  return (
    <CategoryIconGroup>
      <polygon points="43.3,38 22.1,50.2 1,38 1,13.5 22.1,1.2 43.3,13.5" />
      {name === 'Cryptography' && (
        <>
          <circle cx="32.2" cy="20" r="5.6" />
          <line x1="6.5" y1="20" x2="26.6" y2="20" />
          <line x1="6.5" y1="20" x2="6.5" y2="25.6" />
          <line x1="10.3" y1="20.1" x2="10.3" y2="23.4" />
          <line x1="6.5" y1="30.6" x2="6.5" y2="34.9" />
          <circle cx="12.8" cy="32.7" r="2.2" />
          <circle cx="25.3" cy="32.7" r="2.2" />
          <line x1="19" y1="30.6" x2="19" y2="34.9" />
          <line x1="31.6" y1="30.6" x2="31.6" y2="34.9" />
          <line x1="36.1" y1="30.6" x2="36.1" y2="34.9" />
        </>
      )}
      {name === 'Learning by building' && (
        <>
          <path
            d="M31.8,20.7c-0.5-0.2-0.9-0.6-1.3-1c-0.3-0.3-0.4-0.7-0.4-1.1l0.1-0.6l-1.7-1.7L28,16.4c-0.4,0-0.8-0.1-1.1-0.4
            c-0.6-0.5-1.8-1.5-3.2-1.6c-1.3,0-2.6,0.5-3.6,1.4c-0.1,0.1-0.2,0.2-0.2,0.3c0,0.2,0.1,0.4,0.3,0.5c0.2,0.1,0.4,0.1,0.5-0.1
            c0.8-0.7,1.8-1.1,2.9-1.1c0.8,0.1,1.6,0.4,2.2,1c0.5,0.4,0.7,1,0.5,1.6l-0.4,1.1l1.7,1.7c0.1,0,0.2,0.1,0.2,0.1
            c0.9,0.3,1.6,0.9,2,1.8l0.9-0.9L31.8,20.7z"
          />
          <path
            d="M24.3,20.3c-0.8,0.4-1.6,1-2.1,1.8l-2.3,3.1c-0.5,0.7-1.1,1.3-1.7,1.8L9.5,34C9.2,34.3,9,34.6,9,35s0.1,0.8,0.4,1.1
            l1.1,1.1c0.3,0.3,0.7,0.4,1.1,0.4c0.4,0,0.8-0.2,1-0.5l7.1-8.6c0.5-0.6,1.2-1.2,1.8-1.7l3.1-2.3c0.8-0.6,1.4-1.3,1.8-2.1l0.5-1
            l-1.5-1.5L24.3,20.3z"
          />
          <path d="M34.7,22.5L33,20.8l-3,3l1.7,1.7c0.4,0.4,1,0.4,1.3,0l1.7-1.7C35.1,23.5,35.1,22.9,34.7,22.5z" />
        </>
      )}
    </CategoryIconGroup>
  )
}

export default CategoryIcon

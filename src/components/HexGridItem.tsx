import React from 'react'
import { Article } from '../types'
import theme from '../utils/colors'
import { imagesUrl } from '../utils/helpers'
import CategoryIcon from './CategoryIcon'
import styled from '@emotion/styled'

const HexGridItemDiv = styled.div`
  position: relative;
  grid-row: span 3;
  grid-column: calc(var(--col-start)) / span 2;
  width: 346px;
  height: 400px;

  &:nth-of-type(5n + 1) {
    --col-start: 1;
  }
  &:nth-of-type(5n + 2) {
    --col-start: 3;
  }
  &:nth-of-type(5n + 3) {
    --col-start: 5;
  }
  &:nth-of-type(5n + 4) {
    --col-start: 2;
  }
  &:nth-of-type(5n + 5) {
    --col-start: 4;
  }
  &:last-of-type {
    grid-row: span 4;
  }

  svg {
    overflow: visible;
    cursor: pointer;
    .polygonal-area {
      transition: all 0.7s;
      transform-origin: 50% 50%;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`

interface HexGridItemProps {
  article: Article
}

const HexGridItem: React.FC<HexGridItemProps> = ({ article }) => {
  return (
    <HexGridItemDiv>
      <svg viewBox="0 0 346 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="polygon-bg" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor={theme.main.primary} />
            <stop offset="100%" stopColor={theme.main.secondary} />
          </linearGradient>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>
        <g className="polygonal-area">
          <polygon
            points="173,0 346,100 346,300 173,400 0,300 0,100"
            fill="url(#polygon-bg)"
          />
          <text
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.9)"
            x="50%"
            y="30%"
          >
            {article.title}
            {/* {splitSentence(article.title).map((line, index) => (
              <tspan x="50%" y={`${25 + index * 8}%`}>
                {line}
              </tspan>
            ))} */}
          </text>
          <image
            href={imagesUrl + article.cover.url}
            x="50%"
            y="50%"
            transform="translate(-50, -50)"
          />
          <CategoryIcon name={article.category.name} />
        </g>
      </svg>
    </HexGridItemDiv>
  )
}

export default HexGridItem

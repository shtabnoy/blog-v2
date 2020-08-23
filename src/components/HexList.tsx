import React, { useState, useEffect } from 'react'
import { Article } from '../types'
import styled from '@emotion/styled'
import HexGridItem from './HexGridItem'

interface HexListProps {
  articles: Article[]
}

const HexGridList = styled.div`
  display: grid;
  justify-content: center;
  grid-auto-rows: 100px;
  grid-template-columns: repeat(2, 160px);
  @media (min-width: 600px) {
    grid-template-columns: repeat(3, 160px);
  }
  @media (min-width: 800px) {
    grid-template-columns: repeat(4, 160px);
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 160px);
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(6, 160px);
  }
  grid-gap: 10px 26px;
  padding-top: 120px;
`

const animateOpacityTo = (opacity: number) => {
  const elems = document.querySelectorAll('.hex-grid-item') as NodeListOf<
    HTMLDivElement
  >
  elems.forEach((elem) => {
    elem.style.transition = 'opacity 0.3s ease-out'
    elem.style.opacity = `${opacity}`
  })
}

const HexList: React.FC<HexListProps> = ({ articles }) => {
  const [categoryId, setCategoryId] = useState('')

  useEffect(() => {
    animateOpacityTo(1)
  }, [categoryId])

  const animateAndUpdateCategory = (categoryId: string) => {
    animateOpacityTo(0)
    setTimeout(() => {
      setCategoryId(categoryId)
    }, 300)
  }
  return (
    <HexGridList>
      {articles
        .filter(
          (article: Article) =>
            !categoryId || article.category.id === categoryId
        )
        .map((article: Article) => (
          <HexGridItem
            article={article}
            key={article.id}
            setCategory={animateAndUpdateCategory}
          />
        ))}
    </HexGridList>
  )
}

export default HexList

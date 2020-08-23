import React, { useState, useEffect } from 'react'
import { Article, Category } from '../types'
import styled from '@emotion/styled'
import HexGridItem from './HexGridItem'
import CrossIcon from './icons/CrossIcon'

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

const CurrentCategory = styled.div`
  position: fixed;
  z-index: 1;
  bottom: 12px;
  left: 12px;
  padding: 4px 0;
  button {
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    color: white;
    display: flex;
    align-items: center;
    span {
      margin-left: 8px;
      transition: all 0.3s ease-in-out;
      text-decoration: underline;
    }
    svg {
    }
  }
`

// const animateOpacityTo = (opacity: number, categoryId: string) => {
//   const elems = document.querySelectorAll('.hex-grid-item') as NodeListOf<
//     HTMLDivElement
//   >
//   elems.forEach((elem) => {
//     if (
//       elem.classList.toString().indexOf(`hex-category-${categoryId}`) === -1
//     ) {
//       elem.style.transition = 'opacity 0.3s ease-out'
//       elem.style.opacity = `${opacity}`
//     }
//   })
// }

const HexList: React.FC<HexListProps> = ({ articles }) => {
  const [category, setCategory] = useState(null)

  // useEffect(() => {
  //   if (category) animateOpacityTo(1, category.id)
  // }, [category])

  const animateAndUpdateCategory = (category: Category) => {
    // animateOpacityTo(0, category.id)
    // setTimeout(() => {
    setCategory(category)
    // }, 300)
  }
  return (
    <>
      {category && (
        <CurrentCategory>
          <button
            onClick={() => {
              setCategory(null)
            }}
          >
            <CrossIcon />
            <span>{category.name}</span>
          </button>
        </CurrentCategory>
      )}
      <HexGridList>
        {articles
          .filter(
            (article: Article) =>
              !category || article.category.id === category.id
          )
          .map((article: Article) => (
            <HexGridItem
              article={article}
              key={article.id}
              setCategory={animateAndUpdateCategory}
            />
          ))}
      </HexGridList>
    </>
  )
}

export default HexList

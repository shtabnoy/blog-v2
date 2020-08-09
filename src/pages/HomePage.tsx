/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { useQuery } from '@apollo/client'
import CanvasView from '../components/CanvasView'
// import SearchIcon from '../components/icons/SearchIcon'
import styled from '@emotion/styled'
import { GET_ARTICLES } from '../queries'
import theme from '../utils/colors'

const Header = styled.header`
  padding: 32px;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;
  box-sizing: border-box;

  .search {
    width: 350px;
    display: flex;
    align-items: center;
    position: relative;
    transition: width 0.5s ease-in-out;

    .hidden-border {
      background-color: white;
      position: absolute;
      width: 100%;
      height: 1px;
      bottom: 0;
      transition: width 0.5s ease-in-out;
    }

    svg {
      min-width: 30px;
      position: absolute;
      left: 8px;
      &:hover ~ input {
        width: 100%;
      }
    }

    input {
      padding: 15px 0px 14px 48px;
      box-shadow: 0px 0px 0px 1px rgba(0, 0, 0, 0.7);
      border: 0;
      border-radius: 32px;
      width: 0%;
      color: white;
      font-size: 16px;
      opacity: 1;
      transition: width 0.5s ease-in-out;
      background-color: #5d6afb;
      &::-webkit-input-placeholder {
        color: #b4bafd;
      }

      &:focus {
        width: 100%;
        padding-right: 8px;
      }
      &:hover {
        width: 100%;
      }
    }
  }
`

const pageStyles = css`
  background: linear-gradient(
    to bottom,
    ${theme.main.bgPrimary},
    ${theme.main.bgSecondary}
  );
  background-attachment: fixed;
  color: rgba(255, 255, 255, 0.9);

  .hex-grid__list {
    --amount: 3;
    --counter: 1;
    display: grid;
    grid-template-columns: repeat(var(--amount), 1fr 2fr) 1fr;
    grid-gap: 20px 40px;
  }

  .hex-grid__item {
    position: relative;
    grid-column: 1 / span 3;
    grid-row: calc(var(--counter) + var(--counter)) / span 2;
    height: 330px;
    /* background-color: white; */
    &:hover {
      /* transform: scale(1.1); */
    }
  }

  .hex-grid__item:nth-of-type(n + 4) {
    --counter: 2;
  }

  .hex-grid__item:nth-of-type(n + 7) {
    --counter: 3;
  }

  .hex-grid__item:nth-of-type(3n + 1) {
    grid-column: 1 / span 3;
  }

  .hex-grid__item:nth-of-type(3n + 2) {
    grid-column: 3 / span 3;
    grid-row: calc(var(--counter) + var(--counter) - 1) / span 2;
  }

  .hex-grid__item:nth-of-type(3n + 3) {
    grid-column: 5 / span 3;
  }

  .hex-grid__content {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    clip-path: polygon(
      291px 0px,
      388px 165px,
      291px 330px,
      97px 330px,
      0px 165px,
      97px 0px
    );
  }

  .inner {
    position: absolute;
    height: 100%;
    width: 100%;
    background: linear-gradient(
      to bottom,
      ${theme.main.primary},
      ${theme.main.secondary}
    );
    clip-path: polygon(
      291px 1px,
      387px 165px,
      291px 329px,
      97px 329px,
      1px 165px,
      97px 1px
    );
  }
  .title {
    position: absolute;
    width: 170px;
    top: 25%;
    left: 50%;
    transform: translateX(-50%);
  }
`

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  const articles = data.articles.filter(
    (article: any) => article.cover && article.cover.url.endsWith('.svg')
  )

  return (
    <div css={pageStyles}>
      <Header>
        {/* TODO: Implement search */}
        {/* <div className="search">
          <SearchIcon fill={'white'} />
          <input type="text" placeholder="Search article" />
        </div> */}
      </Header>
      {/* <CanvasView
        // TODO: proper handling of articles; not only with an svg cover
        articles={articles}
      /> */}
      <div className="hex-grid__list">
        {articles.map((article: any) => (
          <div className="hex-grid__item">
            <div className="hex-grid__content">
              <div className="inner">
                <div className="title">{article.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default HomePage

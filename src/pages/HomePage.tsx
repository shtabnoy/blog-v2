import React from 'react'
import { useQuery } from '@apollo/client'
// import CanvasView from '../components/CanvasView'
// import SearchIcon from '../components/icons/SearchIcon'
import styled from '@emotion/styled'
import { GET_ARTICLES } from '../queries'
import theme from '../utils/colors'
import HexGridItem from '../components/HexGridItem'
import { Article } from '../types'

const Header = styled.header`
  top: 0;
  height: 120px;
  padding: 32px;
  position: absolute;
  width: 100%;
  /* display: flex; */
  /* align-items: center; */
  box-sizing: border-box;
  h1 {
    margin: 0;
    text-align: center;
  }

  /* .search {
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
  } */
`

const Page = styled.div`
  background: linear-gradient(
    to bottom,
    ${theme.main.bgPrimary},
    ${theme.main.bgSecondary}
  );
  background-attachment: fixed;
  color: rgba(255, 255, 255, 0.9);
`

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

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <Page>
      <Header>
        {/* TODO: Implement search */}
        {/* <div className="search">
          <SearchIcon fill={'white'} />
          <input type="text" placeholder="Search article" />
        </div> */}
        <h1>t3ch b10g</h1>
      </Header>
      {/* <CanvasView
        // TODO: proper handling of articles; not only with an svg cover
        articles={articles}
      /> */}
      <HexGridList>
        {data.articles.map((article: Article) => (
          <HexGridItem article={article} key={article.id} />
        ))}
      </HexGridList>
    </Page>
  )
}

export default HomePage

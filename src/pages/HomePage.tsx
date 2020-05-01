/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { gql, useQuery } from '@apollo/client'
import CanvasView from '../components/CanvasView'
import SearchIcon from '../components/icons/SearchIcon'
import styled from '@emotion/styled'

const GET_ARTICLES = gql`
  query getArticles {
    articles(start: 0) {
      id
      title
      body
      user {
        username
      }
      cover {
        url
        name
      }
      category {
        name
        image {
          url
        }
      }
      created_at
      updated_at
    }
  }
`

const Header = styled.header`
  padding: 32px;
  position: absolute;
  width: 100%;
  display: flex;
  align-items: center;

  .search {
    width: 350px;
    height: 44px;
    /* border-bottom: 1px solid white; */
    padding: 2px 8px;
    display: flex;
    align-items: center;
    position: relative;
    &::after {
      content: '';
      background-color: white;
      position: absolute;
      width: 0%;
      height: 1px;
      bottom: 0;
      transition: width 0.5s ease-in-out;
    }

    svg {
      margin-right: 8px;
    }

    input {
      border: 0;
      color: white;
      background-color: transparent;
      font-size: 16px;
      opacity: 0;
      transition: opacity 0.5s ease-in-out;
    }

    &:hover::after {
      width: 100%;
    }
    &:hover input {
      opacity: 1;
    }
  }
`

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <React.Fragment>
      <Header>
        <div className="search">
          <SearchIcon fill={'white'} />
          <input type="text" placeholder="Search article" />
        </div>
      </Header>
      <CanvasView
        // TODO: proper handling of articles; not only with an svg cover
        articles={data.articles.filter((article: any) =>
          article.cover.url.endsWith('.svg')
        )}
      />
    </React.Fragment>
  )
}

export default HomePage

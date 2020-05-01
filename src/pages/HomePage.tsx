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
      padding: 12px 0px 12px 48px;
      box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 1);
      border: 0;
      width: 0%;
      color: white;
      background-color: transparent;
      font-size: 16px;
      opacity: 1;
      transition: width 0.5s ease-in-out;
      background-color: #3542a8;

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
          {/* <div className="hidden-border"></div> */}
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

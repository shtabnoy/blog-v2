/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react'
import { gql, useQuery } from '@apollo/client'

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
      created_at
      updated_at
    }
  }
`

const HomePage: React.FC = () => {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.articles.map((article: any) => (
    <React.Fragment>
      <img
        src={'http://localhost:1337' + article.cover.url}
        alt={article.cover.name}
      />
      <div key={article.id}>{article.title}</div>
    </React.Fragment>
  ))
}

export default HomePage

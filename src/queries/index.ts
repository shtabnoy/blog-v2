import { gql } from '@apollo/client'

export const GET_ARTICLES = gql`
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
      }
      created_at
      updated_at
    }
  }
`

export const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      title
      body
      created_at
      updated_at
    }
  }
`

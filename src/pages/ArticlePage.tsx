/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

const GET_ARTICLE = gql`
  query getArticle($id: ID!) {
    article(id: $id) {
      id
      title
      body
      user {
        username
      }
      cover {
        url
        name
        hash
        ext
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

type Params = {
  id: string
}

const Article = (): JSX.Element => {
  const params = useParams() as Params
  const { loading, error, data } = useQuery(GET_ARTICLE, {
    variables: {
      id: params.id,
    },
  })
  if (data && data.article) {
    const { id, title, body } = data.article
    return (
      <div>
        <div>{id}</div>
        <div>{title}</div>
        <div>{body}</div>
      </div>
    )
  }
  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>{error}</div>
  }
  return <div>Article loaded.</div>
}

export default Article

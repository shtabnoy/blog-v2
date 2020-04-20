/** @jsx jsx */
import { jsx } from '@emotion/core'
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
      created_at
      updated_at
    }
  }
`

const HomePage = (): JSX.Element => {
  const { loading, error, data } = useQuery(GET_ARTICLES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return data.articles.map((article: any) => <div>{article.title}</div>)
}

export default HomePage

import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ARTICLE } from '../queries'
import theme from '../utils/colors'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'
import BackButton from '../components/BackButton'

interface ArticleProps {}

const Page = styled.div`
  min-height: 100%;
  background: linear-gradient(
    to bottom,
    ${theme.main.bgPrimary},
    ${theme.main.bgSecondary}
  );
  background-attachment: fixed;
  color: rgba(255, 255, 255, 0.9);

  p {
    margin: 36px 0;
  }
  h1 {
    margin: 0 0 72px;
  }
  h2,
  h3 {
    text-indent: 32px;
  }
`

const Content = styled.main`
  margin: 0 auto;
  padding: 120px 100px 100px;
  max-width: 680px;
  min-width: 480px;
`

const Article: React.FC<ArticleProps> = () => {
  const params = useParams<{ id: string }>()
  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: {
      id: params.id,
    },
  })

  return (
    <Page>
      <BackButton />
      <Content>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error :(</p>
        ) : (
          <>
            <h1>{data.article.title}</h1>
            <div className="date">
              {new Date(data.article.created_at).toDateString()}
            </div>
            <ReactMarkdown source={data.article.body} />
          </>
        )}
      </Content>
    </Page>
  )
}

export default Article

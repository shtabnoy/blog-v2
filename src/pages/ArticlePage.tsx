/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { GET_ARTICLE } from '../queries'
import theme from '../utils/colors'
import ReactMarkdown from 'react-markdown'
import styled from '@emotion/styled'

interface ArticleProps {}

const pageStyles = css`
  background: linear-gradient(
    to bottom,
    ${theme.main.bgPrimary},
    ${theme.main.bgSecondary}
  );
  background-attachment: fixed;
  color: white;

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
  padding: 100px 0;
  max-width: 680px;
`

const Article: React.FC<ArticleProps> = () => {
  const params = useParams<{ id: string }>()
  const { data, loading, error } = useQuery(GET_ARTICLE, {
    variables: {
      id: params.id,
    },
  })

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error :(</p>

  return (
    <div css={pageStyles}>
      <Content>
        <h1>{data.article.title}</h1>
        <ReactMarkdown source={data.article.body} />
      </Content>
    </div>
  )
}

export default Article

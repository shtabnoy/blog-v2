/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/client'

const Article = (): JSX.Element => {
  const params = useParams()
  // useQuery()
  console.log(params)
  return <div>Article 1092k</div>
}

export default Article

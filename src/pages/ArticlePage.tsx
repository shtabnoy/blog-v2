/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useParams } from 'react-router-dom'

const Article = (): JSX.Element => {
  const params = useParams()
  console.log(params)
  return <div>Article 1092k</div>
}

export default Article
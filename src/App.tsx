/** @jsx jsx */
import { jsx } from '@emotion/core'
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/articles/:id">
          <ArticlePage />
        </Route>
      </Switch>
    </Router>
  )
}

export default App

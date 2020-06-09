/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Switch, Route, Router } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'
import { createBrowserHistory, createMemoryHistory } from 'history'
const history =
  typeof window === 'undefined'
    ? createMemoryHistory({
        initialEntries: ['/', '/articles/1'],
      })
    : createBrowserHistory()

const App = (): React.ReactNode => {
  return (
    <Router history={history}>
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

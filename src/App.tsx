/** @jsx jsx */
import React from 'react'
import { jsx } from '@emotion/core'
import { Switch, Route } from 'react-router-dom'
import ArticlePage from './pages/ArticlePage'
import HomePage from './pages/HomePage'

const App = (): React.ReactNode => {
  return (
    <Switch>
      <Route path="/">
        <HomePage />
      </Route>
      <Route path="/articles/:id">
        <ArticlePage />
      </Route>
    </Switch>
  )
}

export default App

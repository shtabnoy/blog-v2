import React from 'react'
import ReactDOM from 'react-dom'
// import {
//   ApolloClient,
//   HttpLink,
//   InMemoryCache,
//   ApolloProvider,
// } from '@apollo/client'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
// import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.tsx'
import './App.scss'

const client = new ApolloClient({
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
  // link: new HttpLink({
  //   uri: 'http://localhost:1337/graphql',
  // }),
  // link: createHttpLink({
  uri: 'http://localhost:1337/graphql',
  // ssrForceFetchDelay: 100,
  // }),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router>
      <App />
    </Router>
  </ApolloProvider>,
  document.getElementById('root')
)

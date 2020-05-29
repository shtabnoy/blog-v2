import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
// import { ApolloProvider } from '@apollo/react-common'
import { getDataFromTree } from '@apollo/react-ssr'
// import { ApolloClient } from 'apollo-client'
import { ApolloClient, ApolloProvider } from '@apollo/client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router-dom'
import Express from 'express'
import fetch from 'node-fetch'

import Application from './App'

const app = new Express()
const basePort = 8080

// if (typeof window === 'undefined') {
//   window = {}
// }

function Html({ content, state }) {
  return (
    <html>
      <body>
        <div id="root" dangerouslySetInnerHTML={{ __html: content }} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
              /</g,
              '\\u003c'
            )};`,
          }}
        />
      </body>
    </html>
  )
}

app.use((req, res) => {
  const client = new ApolloClient({
    ssrMode: true,
    // Remember that this is the interface the SSR server will use to connect to the
    // API server, so we need to ensure it isn't firewalled, etc
    link: createHttpLink({
      uri: 'http://localhost:1337/graphql',
      credentials: 'same-origin',
      headers: {
        cookie: req.header('Cookie'),
      },
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  })

  const context = {}

  const App = (
    <ApolloProvider client={client}>
      <StaticRouter location={req.url} context={context}>
        <Application />
      </StaticRouter>
    </ApolloProvider>
  )

  // rendering code (see below)
  getDataFromTree(App).then(() => {
    // We are ready to render for real
    const content = ReactDOMServer.renderToString(App)
    const initialState = client.extract()

    const html = <Html content={content} state={initialState} />
    // res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)

    res.status(200)
    // const apolloState = JSON.stringify(initialState).replace(/</g, '\\u003c')
    // res.send(`
    //   <!doctype html>
    //   <html>
    //     <body>
    //       <div id="root">${content}</div>
    //       <script>
    //         window.__APOLLO_STATE__=${apolloState};
    //       </script>
    //     </body>
    //   </html>
    // `)
    res.send(`<!doctype html>\n${ReactDOMServer.renderToStaticMarkup(html)}`)
    res.end()
  })
})

app.listen(basePort, () =>
  console.log(
    // eslint-disable-line no-console
    `app Server is now running on http://localhost:${basePort}`
  )
)

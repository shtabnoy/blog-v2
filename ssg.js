import React from 'react'
import fs from 'fs'
import ReactDOM from 'react-dom/server'
import { ApolloProvider } from '@apollo/react-common'
import { getDataFromTree } from '@apollo/react-ssr'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { StaticRouter } from 'react-router-dom'
import fetch from 'node-fetch'

import Application from './src/App'

function Html({ content, state }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Bloggy Blog</title>
      </head>
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
        <script src="/bundle.js" charSet="UTF-8" />
      </body>
    </html>
  )
}

const init = () => {
  const client = new ApolloClient({
    ssrMode: true,
    link: createHttpLink({
      uri: 'http://localhost:1337/graphql',
      credentials: 'same-origin',
      // headers: {
      //   cookie: req.header('Cookie'),
      // },
      fetch: fetch,
    }),
    cache: new InMemoryCache(),
  })

  const context = {}

  const App = (
    <ApolloProvider client={client}>
      {/* TODO: Have to figure this out how to make several routes */}
      <StaticRouter location={'/'} context={context}>
        <Application />
      </StaticRouter>
    </ApolloProvider>
  )

  // renderToStringWithData(App).then((content) => {
  //   const initialState = client.extract()
  //   const html = <Html content={content} state={initialState} />
  //   res.status(200)
  //   res.send(`<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`)
  //   res.end()
  // })

  getDataFromTree(App).then(() => {
    const content = ReactDOM.renderToString(App)
    const initialState = client.extract()
    const html = <Html content={content} state={initialState} />
    fs.writeFileSync(
      'build/client/index.html',
      `<!doctype html>\n${ReactDOM.renderToStaticMarkup(html)}`
    )
    // Get all images and save them into "build/client/images" folder
    fetch('http://localhost:1337/upload/files')
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        const urls = res.map((res) => res.url)
        Promise.all(
          urls.map((url) =>
            fetch('http://localhost:1337' + url)
              .then((res) => res.text())
              .then((res) => {
                const dirName = 'build/client/images'
                if (!fs.existsSync(dirName)) {
                  fs.mkdirSync(dirName)
                }
                fs.writeFileSync(dirName + '/' + url.split('/')[2], res)
              })
              .catch(console.error)
          )
        )
      })
      .catch(console.error)
  })
}

init()

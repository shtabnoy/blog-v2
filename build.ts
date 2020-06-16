const fetch = require('node-fetch')
const fs = require('fs')
const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client')
const { GET_ARTICLES } = require('./src/queries')

// TODO: index.html (in the root folder) and inline html in build.ts should have the same content
// Think on just having index.html, parsing its content, injecting the proper
// script tag with hydrated apollo state
const buildHtml = (state: any) => {
  return `
    <!doctype html>
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Code of competence</title>
      </head>
      <body>
        <div id="root"></div>
        <script>
          window.__APOLLO_STATE__=${JSON.stringify(state).replace(
            /</g,
            '\\u003c'
          )};
        </script>
        <script src="bundle.js" charSet="UTF-8"></script>
      </body>
    </html>
  `
}

// Prefetch all the articles data and put it into apollo cache
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: new HttpLink({
    uri: 'http://localhost:1337/graphql',
    fetch: fetch,
  }),
})

client
  .query({
    query: GET_ARTICLES,
  })
  // TODO: one by one get articles with content
  // TODO: get all static files (see temp.js)
  .then(() => {
    const dirName = 'build'
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
    fs.writeFileSync(dirName + '/index.html', buildHtml(client.extract()))
  })

export = {}

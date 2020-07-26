const fetch = require('node-fetch')
const fs = require('fs')
const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client')
const { GET_ARTICLES } = require('./src/queries')

const baseUrl = 'http://localhost:1337'

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
        <title>Shtabnoy blog</title>
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
    uri: `${baseUrl}/graphql`,
    fetch: fetch,
  }),
})

client
  .query({
    query: GET_ARTICLES,
  })
  // TODO: one by one get articles with content
  .then(() => {
    const dirName = 'build'
    
    if (!fs.existsSync(dirName)) {
      fs.mkdirSync(dirName)
    }
    fs.writeFileSync(dirName + '/index.html', buildHtml(client.extract()))

    // Get all images and save them into "build/uploads" folder
    fetch(`${baseUrl}/upload/files`)
      .then((res: any) => res.json())
      .then((res: any) => {
        const urls = res.map((res: any) => res.url)
        Promise.all(
          urls.map((url: string) =>
            fetch(`${baseUrl}` + url)
              .then((res: any) => {
                if (!res.ok) return null
                return res.text()
              })
              .then((res: any) => {
                if (!res) return
                const dirName = 'build/uploads'
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

    // Copy Netlify _redirects file to the build folder
    fs.copyFileSync('_redirects', `${dirName}/_redirects`)
  })

export = {}

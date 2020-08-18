const fetch = require('node-fetch')
const fs = require('fs')
const { ApolloClient, HttpLink, InMemoryCache } = require('@apollo/client')
const { GET_ARTICLES, GET_ARTICLE } = require('./src/queries')

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
      <script>window.__APOLLO_STATE__=${JSON.stringify(state).replace(
        /</g,
        '\\u003c'
      )};</script>
      <script src="/bundle.js" charSet="UTF-8"></script>
    </body>
  </html>
`
}

const buildStatic = async () => {
  const baseUrl = 'http://localhost:1337'
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: `${baseUrl}/graphql`,
      fetch: fetch,
    }),
  })

  // Fetch articles to get their ids for the next requests
  let resp
  let articles
  try {
    resp = await fetch(`${baseUrl}/articles`)
    articles = await resp.json()
  } catch (error) {
    console.error(`Failed to fetch the articles: ${error}`)
    return
  }

  // Filling apollo cache with articles
  try {
    await Promise.all([
      client.query({
        query: GET_ARTICLES,
      }),
      articles.map((article: any) =>
        client.query({
          query: GET_ARTICLE,
          variables: {
            id: article.id.toString(),
          },
        })
      ),
    ])
  } catch (error) {
    console.error(`Failed to run queries on apollo client: ${error}`)
    return
  }

  // Create build directory and put index.html
  // with prefetched articles extracted from apollo client into
  const dirName = 'build'
  if (!fs.existsSync(dirName)) {
    fs.mkdirSync(dirName)
  }
  fs.writeFileSync(dirName + '/index.html', buildHtml(client.extract()))

  // Get the list of all uploaded files
  // TODO: filter those that related to an article
  let files = []
  try {
    resp = await fetch(`${baseUrl}/upload/files`)
    files = await resp.json()
  } catch (error) {
    console.error(`Failed to fetch file list: ${error}`)
    return
  }
  // Get all images and save them into "build/uploads" folder
  try {
    const urls = files.map((res: any) => res.url)
    for (let url of urls) {
      resp = await fetch(`${baseUrl}` + url)
      if (!resp.ok) continue

      const file = await resp.text()
      if (!file) continue

      const dirName = 'build/uploads'
      if (!fs.existsSync(dirName)) {
        fs.mkdirSync(dirName)
      }
      fs.writeFileSync(dirName + '/' + url.split('/')[2], file)
    }
  } catch (error) {
    console.error(`Failed to download images: ${error}`)
    return
  }

  // Copy Netlify _redirects file to the build folder
  fs.copyFileSync('_redirects', `${dirName}/_redirects`)
}

buildStatic()

export {}

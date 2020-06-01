const express = require('express')
const path = require('path')
const app = express()

app.use('/static', express.static(path.join(process.cwd(), 'build/client')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/client/index.html'))
})

app.listen('8080', () => {
  console.log('Server is listening on port 8080')
})

const express = require('express')
const path = require('path')
const app = express()

app.use('/', express.static(path.join(process.cwd(), 'build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/index.html'))
})

app.listen('8080', () => {
  console.log('Server is listening on port 8080')
})

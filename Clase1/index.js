const http = require('node:http')
const findPortAvailable = require('./index2.js')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('request received')
  res.end('Hello world')
})

findPortAvailable(desiredPort).then(port => {
  server.listen((port), () => {
    console.log(`Server listening on port http://localhost:${server.address().port}`)
  })
})

const http = require('node:http')
const requesMethod = require('./routing')
const desiredPort = process.env.PORT ?? 3000

const server = http.createServer(requesMethod)

server.listen((desiredPort), () => {
  console.log(`Server listening on port http://localhost:${server.address().port}`)
})

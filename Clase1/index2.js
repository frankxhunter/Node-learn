const net = require('node:net')

function findPortAvailable (desiredPort) {
  return new Promise((resolve, reject) => {
    const server = net.createServer()

    server.listen(desiredPort, () => {
      server.close()
      resolve(desiredPort)
    })
    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        findPortAvailable(desiredPort + 1).then(port => resolve(port))
      } else {
        reject(err)
      }
    })
  })
}

module.exports = findPortAvailable

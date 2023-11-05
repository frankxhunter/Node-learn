const fs = require('node:fs')

const processRequest = (req, res) => {
  const { method, url } = req

  switch (method) {
    case 'GET':{
      const arrayUrl = url.split('/')
      if (arrayUrl[1] === 'pokemon') {
        const pokemon = arrayUrl[2]
        fs.readdir('./Pokemons/', (err, files) => {
          if (err) {
            return err
          } else {
            const array = files.map((file) => file.split('.')[0])
            if (array.includes(pokemon)) {
              const pokeInfo = require('./Pokemons/' + pokemon)
              res.setHeader('Content-type', 'application/json; charset=utf8')
              return res.end(JSON.stringify(pokeInfo))
            }
          }
          res.statusCode = 404
          res.setHeader('Content-type', 'text/html; charset=utf-8')
          return res.end('<h1>Error 404 por el get<h1>')
        })
      }
      break
    }
    case 'POST':{
      const arrayUrl = url.split('/')
      const pokemon = arrayUrl[2]
      console.log(url)
      if ('/pokemon/' + pokemon === url) {
        let body = ''

        req.on('data', chunk => {
          body += chunk.toString()
        })

        req.on('end', () => {
          const data = JSON.parse(body)
          // Guardar la info en una base de datos
          data.time = 'Date.now()'
          fs.writeFile('./Pokemons/' + pokemon + '.json', JSON.stringify(data), (err) => {
            if (err) {
              throw err
            }
            res.writeHead(201, { 'Contente-type': 'application/json; charset=utf8' })
            res.end(JSON.stringify(data))
          })
        })
      } else {
        res.statusCode = 404
        res.setHeader('Content-type', 'text/html; charset=utf-8')
        return res.end('<h1>Error 404 por el post<h1>')
      }
    }
  }
}

module.exports = processRequest

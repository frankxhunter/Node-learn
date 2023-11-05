const express = require('express')
const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.json())
// app.use('/pokemon', (req, res, next) => {
//   console.log('Este es mi primer middleware')
//   // aqui comprobar si tiene cookies
//   // trackear la solicitud en la base de datos

//   // Haciendo el middleware mas complejo y generico para los post
//   if (req.method !== 'POST') {
//     return next()
//   }
//   if (req.headers['content-type'] !== 'application/json') {
//     return next()
//   }
//   let body = ''
//   req.on('data', (chunck) => {
//     body += chunck.toString()
//   })

//   req.on('end', () => {
//     const data = JSON.parse(body)
//     req.body = data
//     next()
//   })
// }
// )

app.get('/pokemon/charizard', (req, res) => {
  // res.send('<h1>Mi pagina<h1>')
  res.json({ name: 'charizard' })
})

app.post('/pokemon', (req, res) => {
  res.status(201).json(req.body)
})

app.use((req, res) => {
  res.send('<h1>Error 404<h1>')
})

app.listen(PORT, () => {
  console.log('Server listening on port: http://localhost:' + PORT)
})

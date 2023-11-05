const express = require('express')

const users = require(`./users.json`)

const app = express()
app.use(express.json())

app.get('/users/:username/:password', (req, res) => {
    const {username, password}= req.params
    const user = users.find( u => u.username.toLowerCase() === username.toLowerCase())
    if(!user){
        return res.status(404).json({error: "User not found"})
    }
    if(user.password !== password){
        return res.status(401).json({error: "Username or password are wrong"})
    }
    return res.status(200).json(user.info)
})

app.listen(3001, () => {
    console.log("Server listening on port: http://localhost:3001")
})
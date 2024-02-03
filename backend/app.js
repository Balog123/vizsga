const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const dbService = require('./db-config')

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(express.static(path.join(__dirname, '../frontend')))

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend','index.html'))
})

app.post('/regisztracio', (request, response) => {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo)

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})


app.listen(process.env.PORT, () => console.log('Fut az app'))
const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const dbService = require('./db-config')
const jwt = require('jsonwebtoken')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : false }))
app.use(express.static(path.join(__dirname, '../frontend')))


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend','index.html'))
})

app.get('/regisztracio', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend','register.html'))
})

app.get('/bejelentkezes', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend','login.html'))
})

app.get('/termekek', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'product.html'))
})

app.get('/admin',  function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend', 'admin.html'))


})

app.post('/regisztracio', function (request, response) {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo)

    result
    .then(result => {
        if (result) {
            response.status(200).json({ success: true, result })
        } else {
            response.status(400).json({ success: false, error: 'Ez az email már foglalt' })
        }
    })
    .catch(err => {
        console.log(err)
        response.status(500).json({ success: false, error: 'Szerveroldali hiba történt' })
    })
})

/*app.post('/bejelentkezes', (request, response) => {
    const { email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloBejelentkezes(email, jelszo)

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    
    response.cookie('token', token, { httpOnly: true })
    result
    .then(data => response.json({ success: true, data }))
})*/

app.post('/bejelentkezes', (request, response) => {
    const { email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloBejelentkezes(email, jelszo)

    result
    .then(data => response.status(200).json({ success: true, data}))
    .catch(error => response.status(500).json({ success: false, error: error.message }));
})

app.get('/termek', async (req, res) => {
    const db = dbService.getDbServiceInstance()
    const termekInformacio = await db.termekMegjelenites()
    res.json({ termekInformacio })
})


app.listen(process.env.PORT, () => console.log('Fut az app'))
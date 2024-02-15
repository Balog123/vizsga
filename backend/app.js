const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const dbService = require('./db-config')
const jwt = require('jsonwebtoken')

const app = express()
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

app.post('/regisztracio', (request, response) => {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo)

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})

app.post('/bejelentkezes', (request, response) => {
    const { email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloBejelentkezes(email, jelszo)

    const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    })
    
    response.cookie('token', token, { httpOnly: true })
    result
    .then(data => response.json({ success: true, data }))
})

// app.get('/termek', async (req, res) => {
//     const db = dbService.getDbServiceInstance()
//     const termekInformacio = await db.termekMegjelenites()
//     res.json({ termekInformacio })
// })
app.get('/termek', async (req, res) => {
    const db = dbService.getDbServiceInstance();
    const termekInformacio = await db.termekMegjelenites();
    
    console.log("Termékek:");
    termekInformacio.forEach(row => {
        console.log(`${row.termek_nev} - ${row.termek_leiras} - ${row.kep_url1}`);
    });

    res.json({ termekInformacio });
});


app.post('/admin-felhasznaloreg', (request, response) => {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.admin_felhasznaloFelvetel(keresztnev, vezeteknev, email, jelszo)

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})

app.delete('/admin-felhasznalotorles', (request, response) => {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.admin_felhasznaloTorles(keresztnev, vezeteknev, email, jelszo)

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})

app.put('/admin-felhasznalomodosit', (request, response) => {
    const { keresztnev, vezeteknev, email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.admin_felhasznaloModosit(keresztnev, vezeteknev, email, jelszo)

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})

app.get('/admin-felhasznaloolvas', (request, response) => {
    const db = dbService.getDbServiceInstance()
    const result = db.admin_felhasznaloOlv()

    result
    .then(data => response.json({ data: data }))
    .catch(err => console.log(err))
})



app.listen(process.env.PORT, () => console.log('Fut az app'))

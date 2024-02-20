const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const dbService = require('./db-config')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended : false }))
app.use(express.static(path.join(__dirname, '../frontend')))

app.use(['/admin', '/admin/*'], authenticateAdmin);

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

app.get('/termek', async (req, res) => {
    const db = dbService.getDbServiceInstance()
    const termekInformacio = await db.termekMegjelenites()
    res.json({ termekInformacio })
})

app.get('/termek/:termekId', async (req, res) => {
    try {
        const termekId = req.params.termekId;
        const db = dbService.getDbServiceInstance(); // Példányosítjuk az adatbázis szolgáltatást
        const termekAdatok = await getTermekById(termekId);
        res.render('productDetails', { termekAdatok });
    } catch (error) {
        console.error('Hiba a termék lekérése során', error);
        // Kezeljük a hibát, például küldjünk vissza egy hibaüzenetet
        res.status(500).send('Internal Server Error');
    }
});

async function getTermekById(termekId) {
    const sql = `SELECT * FROM termek WHERE termek_id = ?`;
    const termekAdatok = await dbService.getDbServiceInstance().query(sql, [termekId]);
    return termekAdatok;
}




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

    result
    .then(data => response.status(200).json({ success: true, data}))
    .catch(error => response.status(500).json({ success: false, error: error.message }));
})*/

function authenticateAdmin(req, res, next) {
    console.log("authenticateAdmin middleware called");
    if (req.cookies && req.cookies.token) {
        console.log("Token found in cookies:", req.cookies.token);
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error('Token decoding failed:', err);
            } else {
                console.log('Decoded token:', decodedToken);
                if (decodedToken.isAdmin) {
                    next(); 
                } else {
                    res.status(403).json({ success: false, error: 'Nincs jogosultsága az admin oldalhoz' });
                }
            }
        });
    } else {
        console.log("No token found in cookies");
        res.status(401).json({ success: false, error: 'Nincs hitelesítő token' });
    }
}

app.post('/bejelentkezes', (request, response) => {
    const { email, jelszo } = request.body
    const db = dbService.getDbServiceInstance()

    const result = db.felhasznaloBejelentkezes(email, jelszo)

    result.then(data => {
        const isAdmin = data.isAdmin;

        const token = jwt.sign({ email: email, isAdmin: isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        response.cookie('token', token, { httpOnly: true });

        response.status(200).json({ success: true, data})
    })
    .catch(error => {
        response.status(500).json({ success: false, error: error.message });
    });
})

app.listen(process.env.PORT, () => console.log('Fut az app'))
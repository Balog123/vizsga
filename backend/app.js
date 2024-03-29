const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const path = require('path');
const dbService = require('./db-config')
const connection = dbService.getDbServiceInstance().getConnection();
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser');

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

app.use(['/admin', '/admin/*'], authenticateAdmin);

app.use('/css', express.static(path.resolve(__dirname, '..', 'frontend', 'css')));
app.use('/images', express.static(path.resolve(__dirname, '..', 'frontend', 'images')));
app.use('/js', express.static(path.resolve(__dirname, '..', 'frontend', 'js')));
app.use(express.static(path.resolve(__dirname, '..', 'frontend')));

app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'index.html'));
});

app.get('/regisztracio', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'register.html'));
})

app.get('/bejelentkezes', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'login.html'));
})

app.get('/products', (req, res) => {
    const { category } = req.query;

    if (!category) {
        res.sendFile(path.resolve(__dirname, '..', 'frontend', 'allproducts.html'));
        return;
    }

    const categoryPagePath = path.resolve(__dirname, '..', 'frontend', `${category.toLowerCase()}.html`);
    res.sendFile(categoryPagePath);
});

app.get('/products/:id', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'singleproduct.html'));
});

app.get('/api/products', (req, res, next) => {
    const { category } = req.query;

    if (category) {
        const query = `
            SELECT Termek.*, Kep.kep_url
            FROM Termek
            INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            WHERE Termek.termek_kategoria = ?
        `;
        connection.query(query, [category], (error, results) => {
            if (error) {
                console.error("Error fetching products by category:", error);
                res.status(500).json({ error: "Error fetching products by category" });
                return;
            }
            res.json({ products: results });
        });
    } else {
        const query = 'SELECT Termek.*, Kep.kep_url FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id';
        connection.query(query, (error, results) => {
            if (error) {
                console.error("Error fetching products:", error);
                res.status(500).json({ error: "Error fetching products" });
                return;
            }
            res.json({ products: results });
        });
    }
});

app.get('/api/products/:id', (req, res) => {
    const productId = req.params.id;
    const db = dbService.getDbServiceInstance();
    db.getProductById(productId)
        .then(product => {
            if (!product) {
                res.status(404).json({ error: "Product not found" });
            } else {
                res.json({ product });
            }
        })
        .catch(error => {
            console.error("Error fetching product details:", error);
            res.status(500).json({ error: "Error fetching product details" });
        });
});

app.get('/api/related-products/:id', (req, res) => {
    const productId = req.params.id;
    const db = dbService.getDbServiceInstance();

    db.getRelatedProducts(productId)
        .then(relatedProducts => {
            res.json({ relatedProducts });
        })
        .catch(error => {
            console.error("Error fetching related products:", error);
            res.status(500).json({ error: "Error fetching related products" });
        });
});

app.get('/api/categories', async (req, res) => {
    try {
        const db = dbService.getDbServiceInstance();
        const categories = await db.getCategories();
        res.json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Error fetching categories" });
    }
});

app.get('/admin', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'admin.html'));
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

function authenticateAdmin(req, res, next) {
    //console.log("authenticateAdmin middleware called");
    if (req.cookies && req.cookies.token) {
        //console.log("Token found in cookies:", req.cookies.token);
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error('Token decoding failed:', err);
            } else {
                //console.log('Decoded token:', decodedToken);
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

        const token = jwt.sign({id: data.id, email: email, isAdmin: isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        response.cookie('token', token, { httpOnly: true });

        response.status(200).json({ success: true, data })
    })
        .catch(error => {
            response.status(500).json({ success: false, error: error.message });
        });
})

app.post('/admin/feltoltes', (req, res) => {
    const { kategoria, kep_url, nev, ar, leiras, szelesseg, magassag, hossz, raktaron } = req.body
    const db = dbService.getDbServiceInstance()

    const result = db.termekFeltoltes(kategoria, kep_url, nev, ar, leiras, szelesseg, magassag, hossz, raktaron)

    result
        .then((data) => {
            res.status(200).json({ success: true, data })
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({ success: false, error: 'Szerveroldali hiba történt' })
        })
})

app.get('/admin/megjelenites', (req, res) => {
    const db = dbService.getDbServiceInstance();

    db.termekAdminMegjelenites()
        .then(data => res.status(200).json({ success: true, data }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, error: 'Szerveroldali hiba történt' });
        });
});

app.patch('/admin/modositas', (request, response) => {
    const { id, ar } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.termekArModositas(id, ar);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.delete('/api/products/:id', (req, res) => {
    const termek_id = req.params.id;
    const db = dbService.getDbServiceInstance();

    db.termekAdminTorles(termek_id)
        .then(result => {
            if (result.affectedRows === 0) {
                res.status(404).json({ success: false, error: "Product not found" });
            } else {
                res.status(200).json({ success: true, message: "Product deleted successfully" });
            }
        })
        .catch(error => {
            console.error("Error deleting product:", error);
            res.status(500).json({ success: false, error: "Error deleting product" });
        });
});


app.listen(process.env.PORT, () => console.log(`Alkalmazás ${process.env.PORT} porton fut`))
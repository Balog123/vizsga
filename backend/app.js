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
const nodemailer = require('nodemailer');

app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }))

// Middleware to check for JWT cookie
app.use((req, res, next) => {
    const token = req.cookies.your_jwt_cookie_name;
  
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
          res.clearCookie('your_jwt_cookie_name');
          next();
        } else {
          req.user = user;
          next();
        }
      });
    } else {
      next();
    }
  });
  

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

app.get('/kosar', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'cart.html'))
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

// app.get('/api/products', (req, res, next) => {
//     const { category } = req.query;

//     if (category) {
//         const query = `
//             SELECT Termek.*, Kep.kep_url
//             FROM Termek
//             INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
//             WHERE Termek.termek_kategoria = ?
//         `;
//         connection.query(query, [category], (error, results) => {
//             if (error) {
//                 console.error("Error fetching products by category:", error);
//                 res.status(500).json({ error: "Error fetching products by category" });
//                 return;
//             }
//             res.json({ products: results });
//         });
//     } else {
//         const query = 'SELECT Termek.*, Kep.kep_url FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id';
//         connection.query(query, (error, results) => {
//             if (error) {
//                 console.error("Error fetching products:", error);
//                 res.status(500).json({ error: "Error fetching products" });
//                 return;
//             }
//             res.json({ products: results });
//         });
//     }
// });

app.get('/api/products', (req, res, next) => {
    const { category, sortOrder } = req.query;

    let query;

    if (category) {
        query = `
            SELECT Termek.*, Kep.kep_url
            FROM Termek
            INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            WHERE Termek.termek_kategoria = ?
        `;
    } else {
        query = 'SELECT Termek.*, Kep.kep_url FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id';
    }

    if (sortOrder) {
        switch (sortOrder) {
            case '1':
                query += ' ORDER BY termek_nev ASC';
                break;
            case '2':
                query += ' ORDER BY termek_ar DESC';
                break;
            case '3':
                query += ' ORDER BY termek_ar ASC';
                break;
        }
    }

    connection.query(query, category ? [category] : [], (error, results) => {
        if (error) {
            console.error("Error fetching products:", error);
            res.status(500).json({ error: "Error fetching products" });
            return;
        }
        res.json({ products: results });
    });
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
        
        const token = jwt.sign({ id: data.id, email: email, isAdmin: isAdmin }, process.env.JWT_SECRET, {
            expiresIn: '4h',
        });

        response.cookie('token', token, { httpOnly: true });

        response.status(200).json({ success: true, data })
    })
        .catch(error => {
            response.status(500).json({ success: false, error: error.message });
        });
})

function authenticateUser(req, res, next) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error('Hiba a token decodolása során:', err)
                res.status(401).json({ success: false, error: 'Érvénytelen token' })
            } else {
                req.user = decodedToken
                next();
            }
        });
    } else {
        console.log('Nem talált tokent')
        res.status(401).json({ success: false, error: 'Nincs hitelesíthető token' })
    }
}

app.get('/api/kosar', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const cartItems = await db.getCartItemsByUserId(userId);

        res.status(200).json({ success: true, cartItems });
    } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).json({ success: false, error: "Error fetching cart items" });
    }
});

app.post('/api/kosar', authenticateUser, async (req, res) => {
    try {
        const { productId, darab } = req.body;
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const productDetails = await db.getProductById(productId);

        if (!productDetails) {
            return res.status(404).json({ success: false, error: "Product not found" });
        }

        const { termek_nev, termek_ar } = productDetails;

        const result = await db.addToCart(productId, termek_nev, termek_ar, darab, userId);

        if (result.success) {
            // After adding the product to the cart, fetch updated cart items
            const updatedCartItems = await db.getCartItemsByUserId(userId);
            
            return res.status(200).json({ success: true, message: "Product added to cart successfully", cartItems: updatedCartItems });
        } else {
            return res.status(500).json({ success: false, error: "Error adding product to cart" });
        }
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ success: false, error: "Error adding product to cart" });
    }
});

/*app.post('/api/kosar', authenticateUser, async (req, res) => {
    try {
        const { productId, darab } = req.body;
        const userId = req.user.id;

        const query = `
            SELECT termek_nev, termek_ar
            FROM Termek
            WHERE termek_id = ?
        `;

        connection.query(query, [productId], (error, results) => {
            if (error) {
                console.error("Error retrieving product details:", error);
                res.status(500).json({ success: false, error: "Error retrieving product details" });
                return;
            }

            if (results.length === 0) {
                res.status(404).json({ success: false, error: "Product not found" });
                return;
            }

            const { termek_nev, termek_ar } = results[0];

            const insertQuery = `
                INSERT INTO Kosar (kosar_termek_id, kosar_nev, kosar_ar, kosar_darab, kosar_felhasznalo_id)
                VALUES (?, ?, ?, ?, ?)
            `;

            connection.query(insertQuery, [productId, termek_nev, termek_ar, darab, userId], (error, result) => {
                if (error) {
                    console.error("Error adding product to cart:", error);
                    res.status(500).json({ success: false, error: "Error adding product to cart" });
                    return;
                }
                res.status(200).json({ success: true, message: "Product added to cart successfully" });
            });
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ success: false, error: "Error adding product to cart" });
    }
});*/

// app.post('/api/kosar', authenticateUser, async (req, res) => {
//     try {
//         const { productId } = req.body;
//         const userId = req.user.id;

//         // Itt hívd meg az adatbázis metódust a termék hozzáadásához a kosárhoz
//         // Példa:
//         // const addedToCart = await db.addToCart(userId, productId);

//         // Például ha az addToCart visszatér a sikeres hozzáadási üzenettel
//         res.status(200).json({ success: true, message: "Termék hozzáadva a kosárhoz" });
//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         res.status(500).json({ success: false, error: "Hiba történt a kosárba helyezés közben" });
//     }
// });

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
        .then(data => response.json({ success: data }))
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

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'butorprojekt@gmail.com',
        pass: 'gykc kjhj ajrn nbfo' //Qwertzuiop123456789
    }
});

app.post('/api/send-email', (req, res) => {
    const { email } = req.query;

    const mailOptions = {
        from: 'butorprojekt@gmail.com',
        to: email,
        subject: 'Köszönjük az érdeklődését',
        text: 'Üdvözöljük feliratkozóink között!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

app.delete('/api/removeCartItem', authenticateUser, async (req, res) => {
    const db = dbService.getDbServiceInstance();
    const { kosar_id } = req.body;

    try {
        const result = await db.removeCartItem(kosar_id);

        if (result.success) {
            const updatedCartItems = await db.getCartItemsByUserId(req.user.id);

            res.json({ success: true, message: "Cart item removed successfully", cartItems: updatedCartItems });
        } else {
            res.status(500).json({ success: false, error: "Error removing cart item" });
        }
    } catch (error) {
        console.error("Error removing cart item:", error);
        res.status(500).json({ success: false, error: "Error removing cart item" });
    }
});


app.get('/search', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'search.html'));
});

app.get('/api/search', async (req, res) => {
    const db = dbService.getDbServiceInstance();
    const query = req.query.query;

    try {
        const searchResults = await db.searchProducts(query);
        res.json({ success: true, searchResults });
    } catch (error) {
        console.error("Error in search query:", error);
        res.status(500).json({ success: false, error: "Error in search query" });
    }
});

app.get('/check-auth', authenticateUser, (req, res) => {
    console.log('User is authenticated:', req.user);
    res.json({ success: true, data: req.user });
});

app.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.json({ success: true, message: 'Logout successful' });
});

app.post('/api/save-user-details', authenticateUser, async (req, res) => {
    const { felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim1 } = req.body;
    
    try {
        const result = await saveUserDetailsDetails(req.user.id, felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim1);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Error saving user details:", error);
        res.status(500).json({ success: false, error: "Error saving user details" });
    }
});




app.listen(process.env.PORT, () => console.log(`Alkalmazás ${process.env.PORT} porton fut`))
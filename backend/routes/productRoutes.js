const express = require('express');
const router = express.Router();
const dbService = require('../services/productServices');
const connection = dbService.getDbServiceInstance().getConnection();

router.get('/', (req, res) => {
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


router.get('/:id', (req, res) => {
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


module.exports = router;
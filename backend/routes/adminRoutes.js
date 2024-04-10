const express = require('express');
const router = express.Router();
const dbService = require('../services/adminServices');


router.post('/feltoltes', (req, res) => {
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

router.get('/megjelenites', (req, res) => {
    const db = dbService.getDbServiceInstance();

    db.termekAdminMegjelenites()
        .then(data => res.status(200).json({ success: true, data }))
        .catch(err => {
            console.error(err);
            res.status(500).json({ success: false, error: 'Szerveroldali hiba történt' });
        });
});

router.patch('/modositas', (request, response) => {
    const { id, ar } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.termekArModositas(id, ar);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

router.delete('/:id', (req, res) => {
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

module.exports = router;
const express = require('express');
const router = express.Router();
const dbService = require('../services/relatedproductsServices');

router.get('/:id', (req, res) => {
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

module.exports = router;
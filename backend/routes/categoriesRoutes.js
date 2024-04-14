const express = require('express');
const router = express.Router();
const dbService = require('../services/categoriesServices');

router.get('/', async (req, res) => {
    try {
        const db = dbService.getDbServiceInstance();
        const categories = await db.getCategories();
        res.json({ categories });
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Error fetching categories" });
    }
});

module.exports = router;
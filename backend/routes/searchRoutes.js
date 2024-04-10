const express = require('express');
const router = express.Router();
const dbService = require('../services/searchService');

router.get('/', async (req, res) => {
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

module.exports = router;
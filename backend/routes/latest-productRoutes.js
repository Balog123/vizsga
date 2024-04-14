const express = require('express');
const router = express.Router();
const dbService = require('../services/latestproductServices');

router.get('/', async (req, res) => {
    try {
        const latestProducts = await dbService.getDbServiceInstance().getLatestProducts();
        res.json(latestProducts);
    } catch (error) {
        console.error('Error fetching latest products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
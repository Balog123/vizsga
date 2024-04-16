const express = require('express');
const router = express.Router();
const dbService = require('../services/userServices');

router.post('/', async function (request, response) {
    const { keresztnev, vezeteknev, email, jelszo } = request.body;
    const db = dbService.getDbServiceInstance();

    try {
        const result = await db.felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo);
        if (result.success) {
            response.status(200).json(result);
        } else {
            response.status(400).json(result);
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ success: false, error: 'Szerveroldali hiba történt' });
    }
});


module.exports = router;

const express = require('express');
const router = express.Router();
const dbService = require('../services/userServices');

router.post('/', function (request, response) {
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

module.exports = router;

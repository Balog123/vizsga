const express = require('express');
const router = express.Router();
const dbService = require('../services/userServices');
const jwt = require('jsonwebtoken');

router.post('/', (request, response) => {
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

module.exports = router;
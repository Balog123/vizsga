const express = require('express');
const router = express.Router();
const dbService = require('../services/userServices');
const authenticateUser = require('../auth/authUser')

router.patch('/', authenticateUser, async (req, res) => {
    const { felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim1 } = req.body;
    const db = dbService.getDbServiceInstance()

    try {
        const felhasznalo_id = req.user.id;

        const result = await db.saveUserDetails(felhasznalo_id, felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim1);
        res.status(200).json({ success: true, result });
    } catch (error) {
        console.error("Error saving user details:", error);
        res.status(500).json({ success: false, error: "Error saving user details" });
    }
});

module.exports = router;
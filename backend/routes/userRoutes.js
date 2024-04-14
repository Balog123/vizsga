const express = require('express');
const router = express.Router();
const dbService = require('../services/userServices');
const authenticateUser = require('../auth/authUser')

router.get('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const userDetails = await db.getUserDetailsById(userId);

        if (userDetails) {
            res.status(200).json({ success: true, userDetails });
        } else {
            res.status(404).json({ success: false, error: "User details not found" });
        }
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ success: false, error: "Error fetching user details" });
    }
});

module.exports = router;
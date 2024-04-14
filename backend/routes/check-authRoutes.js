const express = require('express');
const router = express.Router();
const authenticateUser = require('../auth/authUser')

router.get('/', authenticateUser, (req, res) => {
    console.log('User is authenticated:', req.user);
    res.json({ success: true, data: req.user });
});

module.exports = router;
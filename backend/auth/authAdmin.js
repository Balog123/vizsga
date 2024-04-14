const jwt = require('jsonwebtoken');

function authenticateAdmin(req, res, next) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error('Token decoding failed:', err);
            } else {
                if (decodedToken.isAdmin) {
                    next();
                } else {
                    res.status(403).json({ success: false, error: 'Nincs jogosultsága az admin oldalhoz' });
                }
            }
        });
    } else {
        console.log("No token found in cookies");
        res.status(401).json({ success: false, error: 'Nincs hitelesítő token' });
    }
}

module.exports = authenticateAdmin;
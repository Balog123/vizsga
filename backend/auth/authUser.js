const jwt = require('jsonwebtoken');

function authenticateUser(req, res, next) {
    if (req.cookies && req.cookies.token) {
        const token = req.cookies.token;

        jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
            if (err) {
                console.error('Hiba a token decodolása során:', err)
                res.status(401).json({ success: false, error: 'Érvénytelen token' })
            } else {
                req.user = decodedToken
                next();
            }
        });
    } else {
        console.log('Nem talált tokent')
        res.status(401).json({ success: false, error: 'Nincs hitelesíthető token' })
    }
}

module.exports = authenticateUser;

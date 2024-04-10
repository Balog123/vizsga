const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'butorprojekt@gmail.com',
        pass: 'gykc kjhj ajrn nbfo'
    }
});

router.post('/', (req, res) => {
    const { email } = req.body;

    const mailOptions = {
        from: 'butorprojekt@gmail.com',
        to: email,
        subject: 'Köszönjük az érdeklődését',
        text: 'Üdvözöljük feliratkozóink között!'
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
});

module.exports = router;
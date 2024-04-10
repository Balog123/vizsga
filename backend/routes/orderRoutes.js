const express = require('express');
const router = express.Router();
const dbService = require('../services/orderServices');
const authenticateUser = require('../auth/authUser')
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'butorprojekt@gmail.com',
        pass: 'gykc kjhj ajrn nbfo'
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: 'butorprojekt@gmail.com',
            to: to,
            subject: subject,
            text: text
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);

        return { success: true };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error: 'Error sending email' };
    }
};

router.post('/', authenticateUser, async (req, res) => {
    try {
        const userId = req.user.id;
        const db = dbService.getDbServiceInstance();

        const cartItems = await db.getCartItemsByUserId(userId);

        if (cartItems.length === 0) {
            return res.status(400).json({ success: false, error: "Empty cart, cannot place order" });
        }

        const deliveryDetails = req.body;

        const requiredFields = ['firstName', 'lastName', 'city', 'zipcode', 'address'];
        for (const field of requiredFields) {
            if (!deliveryDetails[field]) {
                return res.status(400).json({ success: false, error: `Missing field: ${field}` });
            }
        }


        const orderResult = await db.saveOrder(userId, cartItems, deliveryDetails);

        if (orderResult.success) {
            await db.clearCart(userId);
            const userEmail = req.user.email;
            const emailResult = await sendEmail(userEmail, 'Megrendelés visszaigazolása', 'Köszönjük a megrendelést!');
            if (emailResult.success) {
                console.log('Email sent successfully.');
            } else {
                console.error('Failed to send email.');
            }
            res.status(200).json({ success: true, message: "Order placed successfully" });
        } else {
            res.status(500).json({ success: false, error: "Error placing order" });
        }
    } catch (error) {
        console.error("Error placing order:", error);
        res.status(500).json({ success: false, error: "Error placing order" });
    }
});

module.exports = router;
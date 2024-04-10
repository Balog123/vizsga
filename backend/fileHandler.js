const path = require('path');

function sendIndex(req, res) {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
}

function sendRegister(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'register.html'));
}

function sendLogin(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'login.html'));
}

function sendProfile(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'profile.html'));
}

function sendAllProducts(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'allproducts.html'));
}

function sendSingleProducts(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'singleproduct.html'));
}

function sendCart(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'cart.html'));
}

function sendOrder(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'order.html'));
}

function sendAdmin(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'admin.html'));
}

function sendASZF(req, res) {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'aszf.html'));
}

module.exports = { sendIndex, sendRegister, sendLogin, sendProfile, sendAllProducts, sendSingleProducts, sendCart, sendOrder, sendAdmin, sendASZF };

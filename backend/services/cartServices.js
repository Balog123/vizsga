const connection = require('../dbConfig');

let instance = null

class CartService {
    static getDbServiceInstance() {
        return instance ? instance : new CartService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async getProductById(productId) {
        try {
            const query = `
                SELECT termek_nev, termek_ar
                FROM Termek
                WHERE termek_id = ?
            `;
            const result = await new Promise((resolve, reject) => {
                this.getConnection().query(query, [productId], (error, results) => {
                    if (error) reject(error);
                    resolve(results[0]);
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching product details');
        }
    }

    async addToCart(productId, termek_nev, termek_ar, darab, userId) {
        try {
            const insertQuery = `
                INSERT INTO Kosar (kosar_termek_id, kosar_nev, kosar_ar, kosar_darab, kosar_felhasznalo_id)
                VALUES (?, ?, ?, ?, ?)
            `;
            const result = await new Promise((resolve, reject) => {
                this.getConnection().query(insertQuery, [productId, termek_nev, termek_ar, darab, userId], (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
            });
            return { success: true };
        } catch (error) {
            console.error(error);
            return { success: false };
        }
    }

    async updateProductStock(productId, quantity) {
        try {
            const query = `
                UPDATE Termek
                SET termek_raktaron = (termek_raktaron - ?)
                WHERE termek_id = ?
            `;
            await new Promise((resolve, reject) => {
                this.getConnection().query(query, [quantity, productId], (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });
            return true;
        } catch (error) {
            console.error(error);
            throw new Error('Error updating product stock');
        }
    }

    async getCartItemsByUserId(userId) {
        try {
            const query = `
                SELECT Kosar.*, Termek.*, Kep.kep_url
                FROM Kosar
                INNER JOIN Termek ON Kosar.kosar_termek_id = Termek.termek_id
                INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
                WHERE kosar_felhasznalo_id = ?
            `;
            const cartItems = await new Promise((resolve, reject) => {
                this.getConnection().query(query, [userId], (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });
            return cartItems;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching cart items by user ID');
        }
    }

    async removeCartItem(kosarId) {
        try {
            const deleteQuery = 'DELETE FROM Kosar WHERE kosar_id = ?';
            const result = await new Promise((resolve, reject) => {
                this.getConnection().query(deleteQuery, [kosarId], (error, result) => {
                    if (error) {
                        console.error("Error in removeCartItem query:", error);
                        reject(error);
                    }
                    resolve(result);
                });
            });

            return { success: result.affectedRows > 0 };
        } catch (error) {
            console.error("Error in removeCartItem:", error);
            return { success: false };
        }
    }
}

module.exports = CartService;
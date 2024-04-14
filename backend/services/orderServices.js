const connection = require('../dbConfig');

let instance = null

class OrderService {
    static getDbServiceInstance() {
        return instance ? instance : new OrderService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async saveOrder(userId, cartItems, deliveryDetails) {
        try {
            const {
                firstName,
                lastName,
                city,
                zipcode,
                address,
                floor,
                door
            } = deliveryDetails;
    
            const saveOrderPromises = cartItems.map(async (item) => {
                const productId = item.kosar_termek_id;
                const query = "INSERT INTO Rendeles (rendeles_felhasznalo_id, rendeles_szalitasi_keresztnev, rendeles_szalitasi_vezeteknev, rendeles_varos, rendeles_iranyitoszam, rendeles_cim, rendeles_emelet, rendeles_ajto, rendeles_termek_id, rendeles_datum) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)";
                const result = await new Promise((resolve, reject) => {
                    connection.query(query, [userId, firstName, lastName, city, zipcode, address, floor, door, productId], (err, res) => {
                        if (err) reject(err)
                        resolve(res);
                    });
                });
                return result;
            });
    
            await Promise.all(saveOrderPromises);
            return { success: true };
        } catch (error) {
            console.error("Error saving order:", error);
            return { success: false };
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

    async clearCart(userId) {
        try {
            const deleteQuery = 'DELETE FROM Kosar WHERE kosar_felhasznalo_id = ?';
            const result = await new Promise((resolve, reject) => {
                this.getConnection().query(deleteQuery, [userId], (error, result) => {
                    if (error) {
                        console.error("Error in clearCart query:", error);
                        reject(error);
                    }
                    resolve(result);
                });
            });
    
            return { success: result.affectedRows > 0 };
        } catch (error) {
            console.error("Error in clearCart:", error);
            return { success: false };
        }
    }
}

module.exports = OrderService;
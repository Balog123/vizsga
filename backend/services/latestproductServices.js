const connection = require('../dbConfig');

let instance = null

class LatestProductService {
    static getDbServiceInstance() {
        return instance ? instance : new LatestProductService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async getLatestProducts() {
        try {
            const query = `
            SELECT Termek.*, Kep.kep_url
            FROM Termek
            INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            ORDER BY termek_id DESC
            LIMIT 8
        `;
            const latestProducts = await new Promise((resolve, reject) => {
                connection.query(query, (error, results) => {
                    if (error) reject(error);
                    resolve(results);
                });
            });
            return latestProducts;
        } catch (error) {
            console.error('Error fetching latest products:', error);
            throw new Error('Error fetching latest products');
        }
    }
}

module.exports = LatestProductService;
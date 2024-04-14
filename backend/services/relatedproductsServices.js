const connection = require('../dbConfig');

let instance = null

class RelatedProductService {
    static getDbServiceInstance() {
        return instance ? instance : new RelatedProductService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    getRelatedProducts(productId) {
        const query = `
            SELECT t1.*, k1.kep_url
            FROM Termek t1
            LEFT JOIN Kep k1 ON t1.termek_kep_id = k1.kep_id
            WHERE t1.termek_kategoria = (SELECT termek_kategoria FROM Termek WHERE termek_id = ?)
            AND t1.termek_id != ?
            ORDER BY RAND()
            LIMIT 4`;

        return new Promise((resolve, reject) => {
            connection.query(query, [productId, productId], (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }
}

module.exports = RelatedProductService;
const connection = require('../dbConfig');

let instance = null

class ProductService {
    static getDbServiceInstance() {
        return instance ? instance : new ProductService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    getAllProducts() {
        const query = 'SELECT Termek.*, Kep.kep_url FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id';
        return new Promise((resolve, reject) => {
            connection.query(query, (error, results) => {
                if (error) reject(error);
                resolve(results);
            });
        });
    }

    getProductById(productId) {
        const query = `
            SELECT Termek.*, Kep.kep_url
            FROM Termek
            INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            WHERE termek_id = ?`;

        return new Promise((resolve, reject) => {
            connection.query(query, [productId], (error, results) => {
                if (error) {
                    console.error("Error in getProductById query:", error);
                    reject(error);
                } else {
                    console.log("Results in getProductById:", results);
                    resolve(results[0]);
                }
            });
        });
    }
}

module.exports = ProductService;
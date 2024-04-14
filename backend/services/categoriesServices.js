const connection = require('../dbConfig');

let instance = null

class CategoriesService {
    static getDbServiceInstance() {
        return instance ? instance : new CategoriesService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async getCategories() {
        try {
            const query = 'SELECT DISTINCT termek_kategoria AS category_name FROM Termek';
            const result = await new Promise((resolve, reject) => {
                connection.query(query, (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
            });
            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching categories');
        }
    }
}

module.exports = CategoriesService;
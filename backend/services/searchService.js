const connection = require('../dbConfig');

let instance = null

class SearchService {
    static getDbServiceInstance() {
        return instance ? instance : new SearchService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async searchProducts(query) {
        try {
            const searchQuery = `
                SELECT Termek.*, Kep.kep_url 
                FROM Termek 
                INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
                WHERE CONCAT(' ', termek_nev, ' ') LIKE CONCAT('%', ?, '%')`;


            const result = await new Promise((resolve, reject) => {
                this.getConnection().query(searchQuery, [`%${query}%`], (error, results) => {
                    if (error) {
                        console.error("Error in searchProducts query:", error);
                        reject(error);
                    }
                    resolve(results);
                });
            });

            return result;
        } catch (error) {
            console.error("Error in searchProducts:", error);
            return [];
        }
    }
}

module.exports = SearchService;
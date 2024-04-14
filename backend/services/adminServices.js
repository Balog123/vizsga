const connection = require('../dbConfig');

let instance = null

class AdminService {
    static getDbServiceInstance() {
        return instance ? instance : new AdminService()
    }

    constructor(connection) {
        this.connection = connection;
    }

    getConnection() {
        return connection;
    }

    async termekFeltoltes(kategoria, kep_url, nev, ar, leiras, szelesseg, magassag, hossz, raktaron) {
        try {
            const queryKep = "INSERT INTO Kep (kep_url) VALUES (?)"

            const resultKep = await new Promise((resolve, reject) => {
                connection.query(queryKep, [kep_url], (error, result) => {
                    if (error) reject(error)
                    resolve(result)
                });
            });

            const kepId = resultKep.insertId

            const queryTermek = "INSERT INTO Termek (termek_nev, termek_ar, termek_leiras, termek_szelesseg, termek_magassag, termek_hossz, termek_kategoria, termek_raktaron, termek_kep_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
            const resultTermek = await new Promise((resolve, reject) => {
                connection.query(queryTermek, [nev, ar, leiras, szelesseg, magassag, hossz, kategoria, raktaron, kepId], (error, result) => {
                    if (error) reject(error)
                    resolve(result)
                })
            })

            return resultTermek
        }
        catch (error) {
            console.error(error)
            throw new Error('Hiba az adatok feltöltésekor')
        }
    }

    async termekAdminMegjelenites() {
        try {
            const query = `
                SELECT Termek.*, Kep.kep_url
                FROM Termek
                INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            `;

            const result = await new Promise((resolve, reject) => {
                connection.query(query, (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
            });

            return result;
        } catch (error) {
            console.error(error);
            throw new Error('Hiba az adatok lekérésekor');
        }
    }

    async termekAdminTorles(id) {
        try {
            id = parseInt(id, 10);

            const deleteCartItemsQuery = `DELETE FROM Kosar WHERE kosar_termek_id = ?`;
            await new Promise((resolve, reject) => {
                connection.query(deleteCartItemsQuery, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve();
                });
            });

            const deleteImagesQuery = `DELETE FROM Kep WHERE kep_id IN (SELECT termek_kep_id FROM Termek WHERE termek_id = ?)`;
            await new Promise((resolve, reject) => {
                connection.query(deleteImagesQuery, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve();
                });
            });

            const deleteProductQuery = `DELETE FROM Termek WHERE termek_id = ?`;
            const response = await new Promise((resolve, reject) => {
                connection.query(deleteProductQuery, [id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async termekArModositas(id, ar) {
        try {
            id = parseInt(id, 10);
            console.log(id)
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Termek SET termek_ar = ? WHERE termek_id = ?";

                connection.query(query, [ar, id], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });

            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = AdminService;
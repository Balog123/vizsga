const bcrypt = require('bcryptjs');
const connection = require('../dbConfig');

let instance = null

class UserService {
    static getDbServiceInstance() {
        return instance ? instance : new UserService()
    }

    getConnection() {
        return connection;
    }

    async felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8);
            const emailEllenorzes = "SELECT felhasznalo_email FROM felhasznalo WHERE felhasznalo_email = ?";
    
            const result = await new Promise((resolve, reject) => {
                connection.query(emailEllenorzes, [email], (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
            });
    
            if (result.length > 0) {
                return { success: false, error: 'Ez az email cím foglalt!' };
            } else {
                const query = "INSERT INTO felhasznalo (felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email, felhasznalo_jelszo) VALUES (?,?,?,?)";
    
                await new Promise((resolve, reject) => {
                    connection.query(query, [keresztnev, vezeteknev, email, hashJelszo], (err, res) => {
                        if (err) reject(err);
                        resolve(res);
                    });
                });
    
                return { success: true, message: 'Regisztráció sikeres' };
            }
        } catch (error) {
            console.error(error);
            return { success: false, error: 'Internal Server Error' };
        }
    }
    

    async felhasznaloBejelentkezes(email, jelszo) {
        try {
            if (!email || !jelszo) {
                throw new Error('Hiányzó email vagy jelszó');
            }
            const felhasznalo = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM felhasznalo WHERE felhasznalo_email = ?";
                connection.query(query, [email], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result[0]);
                });
            });
            if (!felhasznalo) throw new Error('Rossz email vagy jelszó');
            const helyesJelszo = await bcrypt.compare(jelszo, felhasznalo.felhasznalo_jelszo);
            if (!helyesJelszo) throw new Error('Rossz jelszó');
            const isAdmin = felhasznalo.felhasznalo_admin === 1
            return {
                id: felhasznalo.felhasznalo_id,
                keresztnev: felhasznalo.felhasznalo_keresztnev,
                vezeteknev: felhasznalo.felhasznalo_vezeteknev,
                jelszo: jelszo,
                email: email,
                isAdmin: isAdmin
            };
        } catch (error) {
            console.log(error);
            throw new Error('Sikertelen bejelentkezés');
        }
    }

    async saveUserDetails(felhasznalo_id, felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim) {
        try {
            const query = "UPDATE Felhasznalo SET felhasznalo_varos=?, felhasznalo_iranyitoszam=?, felhasznalo_cim=? WHERE felhasznalo_id=?";
            const result = await new Promise((resolve, reject) => {
                connection.query(query, [felhasznaloVaros, felhasznaloIranyitoszam, felhasznaloCim, felhasznalo_id], (err, res) => {
                    if (err) reject(err);
                    resolve(res);
                });
            });
    
            return result;
        } catch (error) {
            console.error(error);
            throw new Error("Error updating user details");
        }
    };

    async getUserDetailsById(userId) {
        try {
            const query = `
                SELECT felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_iranyitoszam, felhasznalo_cim, felhasznalo_varos
                FROM Felhasznalo
                WHERE felhasznalo_id = ?
            `;
            const userDetails = await new Promise((resolve, reject) => {
                this.getConnection().query(query, [userId], (error, results) => {
                    if (error) reject(error);
                    resolve(results[0]);
                });
            });
            console.log(userDetails)
            return userDetails;
        } catch (error) {
            console.error(error);
            throw new Error('Error fetching user details');
        }
    }
}

module.exports = UserService;
const sql = require('mysql')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
dotenv.config()

let instance = null

const connection = sql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
})

connection.connect((error) => {
    if (error) {
      console.error('Error connecting to database:', error);
    } else {
      console.log('db connected');
    }
  });


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }

    async felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8);
            const emailEllenorzes = "SELECT felhasznalo_email FROM felhasznalo WHERE felhasznalo_email = ?"
            
            const result = await new Promise((resolve, reject) => {
                connection.query(emailEllenorzes, [email], (error, result) => {
                    if (error) reject(error)
                    resolve(result)
                });
            });
    
            if (result.length > 0) {
                console.log('Ez az email már foglalt')
                return null
            } else {
                const query = "INSERT INTO felhasznalo (felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email, felhasznalo_jelszo) VALUES (?,?,?,?)"
                
                await new Promise((resolve, reject) => {
                    connection.query(query, [keresztnev, vezeteknev, email, hashJelszo], (err, res) => {
                        if (err) reject(err)
                        resolve(res)
                    });
                });
    
                return {
                    keresztnev: keresztnev,
                    vezeteknev: vezeteknev,
                    email: email,
                    jelszo: hashJelszo
                };
            }
        } catch (error) {
            console.error(error)
            return null
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
            
            const isAdmin = felhasznalo.felhasznalo_admin === 1;
    
            console.log('Sikeres bejelentkezes');
    
            return {
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

    // getProductById(productId) {
    //     const query = 'SELECT Termek.*, Kep.kep_url1 FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id WHERE termek_id = ?';
    //     return new Promise((resolve, reject) => {
    //         connection.query(query, [productId], (error, results) => {
    //             if (error) reject(error);
    //             resolve(results[0]);
    //         });
    //     });
    // }

    getProductById(productId) {
        const query = `
            SELECT Termek.*, Kep.kep_url
            FROM Termek
            INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
            WHERE termek_id = ?`;
        
        return new Promise((resolve, reject) => {
            connection.query(query, [productId], (error, results) => {
                if (error) reject(error);
                resolve(results[0]);
            });
        });
    }

    // getRelatedProducts(productId) {
    //     const query = `
    //         SELECT Termek.*, Kep.kep_url
    //         FROM Termek
    //         INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id
    //         WHERE termek_kategoria_id = (SELECT termek_kategoria_id FROM Termek WHERE termek_id = ?)
    //         AND termek_id != ?
    //         ORDER BY RAND()
    //         LIMIT 4`;
        
    //     return new Promise((resolve, reject) => {
    //         connection.query(query, [productId, productId], (error, results) => {
    //             if (error) reject(error);
    //             resolve(results);
    //         });
    //     });
    // }
    
}

module.exports = DbService

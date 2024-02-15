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

connection.connect((err) => {
    if (err) {
        console.log(err.message)
    }
    console.log('db ' + connection.state)
})


class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService()
    }


    /*async felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8)
            await new Promise((resolve, reject) => {
                const emailEllenorzes = "SELECT felhasznalo_email FROM felhasznalo WHERE felhasznalo_email = ?"

                connection.query(emailEllenorzes, [email], (error, result) => {
                    if (result[0]) console.log('Ez az email már foglalt')
                    else {
                        const query = "INSERT INTO felhasznalo (felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email, felhasznalo_jelszo) VALUES (?,?,?,?)"

                        connection.query(query, [keresztnev, vezeteknev, email, hashJelszo], (err, res) => {
                            if (err) reject(new Error(err.message))
                        })
                    }

                })

            })
            return {
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: hashJelszo
            } 
        } catch (error) {
            console.log(error)
        }
    }*/

    async felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8);
            const emailEllenorzes = "SELECT felhasznalo_email FROM felhasznalo WHERE felhasznalo_email = ?";
            
            // Ellenőrizd az email címet az adatbázisban
            const result = await new Promise((resolve, reject) => {
                connection.query(emailEllenorzes, [email], (error, result) => {
                    if (error) reject(error);
                    resolve(result);
                });
            });
    
            if (result.length > 0) {
                console.log('Ez az email már foglalt');
                return null; // vagy valamilyen hibaüzenet
            } else {
                const query = "INSERT INTO felhasznalo (felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email, felhasznalo_jelszo) VALUES (?,?,?,?)";
                
                // Új felhasználó hozzáadása az adatbázishoz
                await new Promise((resolve, reject) => {
                    connection.query(query, [keresztnev, vezeteknev, email, hashJelszo], (err, res) => {
                        if (err) reject(err);
                        resolve(res);
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
            console.error(error);
            return null; // vagy valamilyen hibaüzenet
        }
    }
    

    async felhasznaloBejelentkezes(email, jelszo) {
        try {
            const felhasznalo = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM felhasznalo WHERE felhasznalo_email = ?"

                connection.query(query, [email], (err, result) => {
                    if (err) reject(new Error(err.message))
                    resolve(result[0])
                })
            })

            if (!felhasznalo) throw new Error('Rossz email vagy jelszó')

            const helyesJelszo = await bcrypt.compare(jelszo, felhasznalo.felhasznalo_jelszo)

            if (!helyesJelszo) throw new Error('Rossz jelszó')
            else {
                console.log('Sikeres bejelentkezes')
            }

            return {
                keresztnev: felhasznalo.felhasznalo_keresztnev,
                vezeteknev: felhasznalo.felhasznalo_vezeteknev,
                email: email
            }

        } catch (error) { 
            console.log(error)
            throw new Error('Sikertelen bejelentkezes')
        }
    }

    // async termekMegjelenites() {
    //     try {
    //         const query = "SELECT termek_nev, termek_leiras, kep_url1 FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id"
    //         const termekInformacio = await new Promise((resolve, reject) => {
    //             connection.query(query, (err, result) => {
    //                 if (err) reject(new Error(err.message))
    //                 resolve(result[0]);
    //             });
    //         });
    
    //         return termekInformacio
    //     } catch (error) {
    //         console.log(error)
    //         throw new Error('Hiba a termék információ lekérése során')
    //     }
    // }

    async termekMegjelenites() {
        try {
            const query = "SELECT termek_nev, termek_leiras, kep_url1 FROM Termek INNER JOIN Kep ON Termek.termek_kep_id = Kep.kep_id";
            return new Promise((resolve, reject) => {
                connection.query(query, (err, result) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });
        } catch (error) {
            console.log(error);
            throw new Error('Hiba a termék információ lekérése során');
        }
    }
    

    async admin_felhasznaloFelvetel(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8)
            await new Promise((resolve, reject) => {
                const emailEllenorzes = "SELECT felhasznalo_email FROM felhasznalo WHERE felhasznalo_email = ?"

                connection.query(emailEllenorzes, [email], (error, result) => {
                    if (result[0]) console.log('Ez az email már foglalt')
                    else {
                        const query = "INSERT INTO felhasznalo (felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email, felhasznalo_jelszo) VALUES (?,?,?,?)"

                        connection.query(query, [keresztnev, vezeteknev, email, hashJelszo], (err, res) => {
                            if (err) reject(new Error(err.message))
                        })
                    }

                })

            })
            return {
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: hashJelszo
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async admin_felhasznaloTorles(keresztnev, vezeteknev, email, jelszo) {
        try {
            await new Promise((resolve, reject) => {
                const query = "DELETE FROM felhasznalo WHERE felhasznalo_keresztnev = ? AND felhasznalo_vezeteknev = ? AND felhasznalo_email = ? AND felhasznalo_jelszo = ?"
                connection.query(query, [keresztnev, vezeteknev, email, jelszo], (error, result) => {
                    if (error) {
                        reject(new Error(error.message))
                    } else {
                        if (result.affectedRows === 0) {
                            console.log("Nincs olyan felhasználó az adatbázisban, akinek ezek a paraméterek megfelelnének.")
                        } else {
                            console.log("Felhasználó sikeresen törölve.")
                            resolve()
                        }
                    }
                })
            })
            return {
                keresztnev: keresztnev,
                vezeteknev: vezeteknev,
                email: email,
                jelszo: hashJelszo
            } 
        } catch (error) {
            console.log(error)
        }
    }

    async admin_felhasznaloModosit(keresztnev, vezeteknev, email, jelszo) {
        try {
            const hashJelszo = await bcrypt.hash(jelszo, 8)

            await new Promise((resolve, reject) => {
            const query = "UPDATE felhasznalo SET felhasznalo_keresztnev = ?, felhasznalo_vezeteknev = ?, felhasznalo_jelszo = ? WHERE felhasznalo_email = ?"
            connection.query(query, [keresztnev, vezeteknev, hashJelszo, email], (error, result) => {
                if (error) {
                    reject(new Error(error.message))
                } else {
                    if (result.affectedRows === 0) {
                        console.log("Nincs olyan felhasználó az adatbázisban, akinek ezek a paraméterek megfelelnének.")
                    } else {
                        console.log("Felhasználó sikeresen módosítva.")
                        resolve()
                    }
                }
            })
        })
        return {
            keresztnev: keresztnev,
            vezeteknev: vezeteknev,
            email: email,
            jelszo: hashJelszo
        } 
        } catch (error) {
            console.log(error)
        }
    }

    async admin_felhasznaloOlv() {
        try {
            const query = "SELECT felhasznalo_keresztnev, felhasznalo_vezeteknev, felhasznalo_email FROM felhasznalo";
            connection.query(query, (error, results) => {
                if (error) {
                    throw error;
                } else {
                    console.log("Felhasználók:");
                    results.forEach(row => {
                        console.log(`${row.felhasznalo_keresztnev} ${row.felhasznalo_vezeteknev} (${row.felhasznalo_email})`);
                    });
                }
            });
        } catch (error) {
            console.error("Hiba történt a felhasználók lekérdezése közben:", error);
        }
    }
}

module.exports = DbService

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
        return instance ? instance : new DbService();
    }

    async felhasznaloRegisztralas(keresztnev, vezeteknev, email, jelszo) {
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
}
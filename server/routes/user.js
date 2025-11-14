const express = require('express')
bcrypt = require('bcrypt')

const pool = require('../db/db')
const router = express.Router()

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, mobile , birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile , birth) VALUES(?,?,?,?,?,?)`
    try {
        const hashpassword = await bcrypt.hash(password, config.saltRounds)
        pool.query(sql, [first_name, last_name, email, hashpassword, mobile , birth], (error, data) => {
            res.send("done")
        })
    }
    catch (error) {
        res.send("done")
    }
})

module.exports = router
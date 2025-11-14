const express = require('express')
const bcrypt = require('bcrypt')
const result = require('../utils/result')
const pool = require('../db/db')
const router = express.Router()
const config = require('../utils/config')
const jwt = require('jsonwebtoken')

router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password, mobile , birth } = req.body
    const sql = `INSERT INTO users(first_name, last_name, email, password, mobile , birth) VALUES(?,?,?,?,?,?)`
    const hashpassword = await bcrypt.hash(password, config.saltround)
    pool.query(sql, [first_name, last_name, email, hashpassword, mobile , birth], (error, data) => {
        res.send(result.createResult(error, data))
    })
})

router.post('/login' , async(req, res) => {
    const {email , password} = req.body;
    const sql = `select * from users where email = ?`;
    pool.query(sql , [email] , async(error , data) => {
        if (data != ''){
                const dbUser = data[0];
                const userValid = await bcrypt.compare(password , dbUser.password)
                if (userValid){
                    const payload = {
                        uid: dbUser.uid
                    }
                    const token = jwt.sign(payload , config.secret)
                    const user = {
                        token:token,
                        name:  dbUser.name,
                        email: dbUser.email
                    } 
                    res.send(result.createResult(error , user))
                }
                else
                    res.send((result.createResult("Invalid password")))
        }
        else{
            res.send(result.createResult("Invalid email"));    
        }
    })

})

module.exports = router
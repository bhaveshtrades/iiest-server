const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const db = require('../config/db');

//Route for user registration
router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}).notEmpty(),
    body('username', 'Enter a valid username').isLength({min: 3}).notEmpty(),
    body('password', 'Password should be atleast 5 characters long').isLength({min: 5}).notEmpty()
], 
async(req, res)=>{
    const { name, username, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const sql = `INSERT INTO new_registers (name, username, password) VALUES ('${name}', '${username}', '${password}')`;
    db.query(sql, [name, username, password], (err, result)=>{
        if(err){
            res.status(500).json({error: 'Registration failed'});
        }else{
            res.status(200).json({message: 'Resgistration Successful'});
        }
    });
})

//Route for user login
router.post('/login', [
    body('username', 'Enter a valid username').notEmpty(),
    body('password', 'Enter a valid password').notEmpty()
], async(req, res)=>{
    const { username, password } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const sql = `SELECT * FROM new_registers where username='${username}' AND password='${password}'`;
    db.query(sql, [username, password], (err, result)=>{
        if(err){
            console.log()
            res.status(500).json({error: 'Login Failed'})
        }else{
            res.status(200).json({message: result})
        }
    });
})

module.exports = router;
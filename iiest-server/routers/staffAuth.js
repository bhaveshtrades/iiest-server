const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_TOKEN;

//Route for staff entry
router.post('/register', 

//Validation for staff registration using express-validator 
[
    body('employee_name', 'Enter a valid name').isLength({min: 3}).exists(),
    body('gender', 'Enter a valid gender').isLength({min: 4}).exists(),
    body('email', 'Enter a valid email').isEmail().exists(),
    body('contact_no', 'Enter a valid contact number').isNumeric().exists(),
    body('alternate_contact', 'Enter a valid contact number').isNumeric().exists(),
    body('dob', 'Enter a valid date').isDate().exists(),
    body('address', 'Enter a valid address').exists(),
    body('zip_code', 'Enter a valid zip code').isNumeric().exists(),
    body('employee_id', 'Enter a valid employee id').exists(),
    body('portal_type', 'Enter a vaild portal type').exists(),
    body('department', 'Enter a valid department').exists(),
    body('designation', 'Enter a valid designation').exists(),
    body('salary', 'Enter a valid salary').isNumeric().exists(),
    body('grade_pay', 'Enter a valid grade pay').isNumeric().exists(),
    body('doj', 'Enter a valid doj').isDate().exists(),
    body('company_name', 'Enter a valid company name').exists(),
    body('project_name', 'Enter a valid project name').exists(),
    body('username', 'Enter a valid username').isLength({min: 3}).exists(),
    body('password', 'Enter a valid password').isLength({min: 5}).exists()
], 
async(req, res)=>{

    //Fields being used for staff entry
    let success = false;
    const { employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //SQL query for staff registration
    const sql = `INSERT INTO new_registers (employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username, password) VALUES ('${employee_name}', '${gender}', '${email}', '${contact_no}', '${alternate_contact}', '${dob}', '${address}', '${zip_code}', '${employee_id}', '${portal_type}', '${department}', '${designation}', '${salary}', '${grade_pay}', '${doj}', '${company_name}', '${project_name}', '${username}', '${secPass}')`; 

    db.query(sql, [employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username, password], (err, result)=>{
        if(err){
            success = false;
            console.log(err);
            res.status(500).json({success, error: 'Registration failed'});
        }else{
            success = true;
            res.status(200).json({success, message: 'Resgistration Successful'});
        }
    });
})


//Route for staff login
router.post('/login', 

//Validation for staff login using express-validator 
[
body('username', 'Enter a valid username').exists(),
body('password', 'Enter a valid password').exists()
],
async(req, res) => {

    let success = false;

    const { username, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }
  
    // SQL query to check member with the entered username in the database
    const sql = `SELECT * FROM new_registers WHERE username = '${username}'`
    db.query(sql, username, (err, rows) => {

        if (err) {
        return res.status(500).json({success, message: 'Some error occured' });
        } else if (rows.length === 0) {
        return res.status(401).json({success, message: 'Please try to login with correct credentials' });
        }
  
        const user = rows[0];

        //Comparing Hashed Password
        bcrypt.compare(password, user.password,  (err, result)=>{
            if(err || !result){
                success = false
                return res.status(401).json({success, message: 'Please try to login with correct credentials' });
            }

            //Generating a JWT Token after successful login
            const data = {
                user:{
                    id: user.s_no
                }
            }
            
            const authToken = jwt.sign(data,  JWT_SECRET);
            success = true;
            res.status(200).json({ success, authToken });
        }) 
     
    });
  });

module.exports = router;
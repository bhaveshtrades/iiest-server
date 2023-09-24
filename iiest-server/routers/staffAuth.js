const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const staff_register_schema = require('../models/staff_register_schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = process.env.JWT_TOKEN;

//Route for staff entry
router.post('/staffentry', 

//Validation for staff registration using express-validator 
[
    body('employee_name', 'Enter a valid name').isLength({min: 3}).exists(),
    body('gender', 'Enter a valid gender').isLength({min: 4}).exists(),
    body('email', 'Enter a valid email').isEmail().exists(),
    body('contact_no', 'Enter a valid contact number').isMobilePhone().exists(),
    body('alternate_contact', 'Enter a valid contact number').isMobilePhone().exists(),
    body('dob', 'Enter a valid date').isDate().exists(),
    body('country', 'Enter a valid address').exists(),
    body('state', 'Enter a valid address').exists(),
    body('city', 'Enter a valid address').exists(),
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

    try {

    let success = false;

    //Fields being used for staff entry
    const { employee_name, gender, email, alternate_contact, contact_no, dob, country, state, city, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username, password } = req.body;

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }

    //Password Hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(password, salt);

    //To check if employee with same email exists 
    const existing_email = await staff_register_schema.findOne({email});
    if(existing_email){
        return res.status(400).json({success, message: "Employee with this email already exists"});
    }

    //To check if employye with same phone number exists
    const existing_contact = await staff_register_schema.findOne({contact_no});
    if(existing_contact){
        return res.status(400).json({success, message: "Employee with this phone number already exists"});
    }

    //To check if employye with same alternate phone number exists
    const existing_alternate_no = await staff_register_schema.findOne({alternate_contact});
    if(existing_alternate_no){
        return res.status(400).json({success, message: "Employee with this phone number already exists"});
    }


    //To check if employee with same id exists
    const existing_employee_id = await staff_register_schema.findOne({employee_id})
    if(existing_employee_id){
        return res.status(400).json({success, message: "Employee with this id already exists"});
    }

    //To check if employee with same username exists
    const existing_username = await staff_register_schema.findOne({username});
    if(existing_username){
        return res.status(400).json({success, message: "Employee with this username already exists"});
    }

    await staff_register_schema.create({
        employee_name, gender, email, contact_no, alternate_contact, dob, country, state, city, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username, password: secPass
    });

    success = true;
    return res.status(201).json({success, message: "Staff Entry Successfully"});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"})
    }
    
})


//Route for staff login
router.post('/login', 

//Validation for staff login using express-validator 
[
body('username', 'Enter a valid username').exists(),
body('password', 'Enter a valid password').exists()
],
async(req, res) => {

    try {
    let success = false;

    const { username, password } = req.body; //Fields to be used for staff login

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }
    
    //To check if username is available for login
    const employee_user = await staff_register_schema.findOne({username});
    if(!employee_user){
        return res.status(400).json({success, message: "Please try to login with correct credentials"});
    }

    const passwordCompare = await bcrypt.compare(password, employee_user.password); //Comparing hashed password
    if(!passwordCompare){
        return res.status(400).json({success, message: "Please try to login with correct credentials"});
    }

    const data = {
        employee_user:{
            id: employee_user.id
        }
    }    

    const authToken = jwt.sign(data, JWT_SECRET); // Generating a JWT Token
    success = true;
    res.json({success, authToken});

    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
  });

module.exports = router;
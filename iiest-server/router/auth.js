const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const db = require('../config/db');

//Route for staff entry
router.post('/staffentry', 

//Validation for backend using express-validator 
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
    body('project_name', 'Enter a valid project name').exists()
], 
async(req, res)=>{

    //Fields to be used for submission
    const { employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name } = req.body;
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(500).json({errors: errors.array()});
    }

    //Running sql query
    const sql = `INSERT INTO new_registers (employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name) VALUES ('${employee_name}', '${gender}', '${email}', '${contact_no}', '${alternate_contact}', '${dob}', '${address}', '${zip_code}', '${employee_id}', '${portal_type}', '${department}', '${designation}', '${salary}', '${grade_pay}', '${doj}', '${company_name}', '${project_name}')`; 

    db.query(sql, [employee_name, gender, email, contact_no, alternate_contact, dob, address, zip_code, employee_id, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name], (err, result)=>{
        if(err){
            console.log(err)
            res.status(500).json({error: 'Registration failed'});
        }else{
            res.status(200).json({message: 'Resgistration Successful'});
        }
    });
})

//Only for testing purpose: To grab info from database by entering the email
router.post('/login', [
    body('email', 'Enter a valid email').isEmail().exists()
], async(req, res)=>{
    const { email } = req.body;
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const sql = `SELECT * FROM new_registers where email='${email}'`;
    db.query(sql, [email], (err, result)=>{
        if(err){
            res.status(500).json({error: 'Login Failed'})
        }else{
            res.status(200).json({message: result})
        }
    });
})

module.exports = router;
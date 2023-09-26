const staff_register_schema = require('../models/staff_schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generate_username, generate_password, generate_employee_id } = require('../controllers/empGenerator');

const JWT_SECRET = process.env.JWT_TOKEN;

//Controller for staff registration
exports.staff_register = async(req, res)=>{
    try {

        let success = false;
    
        //Fields being used for staff entry
        const { employee_name, gender, email, alternate_contact, contact_no, dob, country, state, city, address, zip_code, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name } = req.body;

    
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

        const register_count = await staff_register_schema.countDocuments({});

        const generatedUsername = generate_username(employee_name, register_count + 1); //Calling function to generate employee username
        console.log((generatedUsername))

        const generatedId = generate_employee_id(company_name, register_count + 1); //Calling function to generate employee id
        console.log(generatedId)

        let generatedPassword = generate_password(10); //Calling function to generate employee password
        console.log(generatedPassword);

        //Password Hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(generatedPassword, salt);
    
        await staff_register_schema.create({
            employee_count: register_count + 1, employee_name, gender, email, contact_no, alternate_contact, dob, country, state, city, address, zip_code, employee_id: generatedId, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username: generatedUsername, password: secPass
        });
    
        success = true;
        return res.status(201).json({success, message: "Staff Entry Successfully"});
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"})
        }
}

//Controller for staff login
exports.staff_login = async(req, res)=>{
    try {
        let success = false;
    
        const { username, password } = req.body; //Fields to be used for staff login
        
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
    
        const authToken = jwt.sign(data, JWT_SECRET); // Generating a JWT Token for further authentication and authorization
        success = true;
        res.json({success, authToken});
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
}

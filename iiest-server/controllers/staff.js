const staff_register_schema = require('../models/staff_schema');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generate_username, generate_password, generate_employee_id } = require('../controllers/empGenerator');
const { sendEmployeeInfo } = require('../controllers/employeeMail');
const auth = JSON.parse(process.env.AUTH);

const JWT_SECRET = auth.JWT_TOKEN;

//Controller for staff registration
exports.staff_register = async(req, res)=>{
    try {

        let success = false;
        let isUnique = false; //To check if id id number generated is unique 
    
        //Fields being used for staff entry
        const { employee_name, gender, email, alternate_contact, contact_no, dob, country, state, city, address, zip_code, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name } = req.body;

    
        //To check if employee with same email exists 
        const existing_email = await staff_register_schema.findOne({email});
        if(existing_email){
            return res.status(401).json({success, message: "Employee with this email already exists"});
        }
    
        //To check if employye with same phone number exists
        const existing_contact = await staff_register_schema.findOne({contact_no});
        if(existing_contact){
            return res.status(401).json({success, message: "Employee with this phone number already exists"});
        }
    
        //To check if employye with same alternate phone number exists
        const existing_alternate_no = await staff_register_schema.findOne({alternate_contact});
        if(existing_alternate_no){
            return res.status(401).json({success, message: "Employee with this phone number already exists"});
        }

        let idNumber; //Variable being used for id number

        //Keeps generating a 4-digit number for id number unless it's value is unique
        while(!isUnique){
            idNumber = Math.floor(1000 + Math.random() * 9000);
            const existingNumber = await staff_register_schema.findOne({id_num: idNumber});
        if(!existingNumber){
            isUnique = true;
            }
        }

        const generatedUsername = generate_username(employee_name, idNumber); //Calling function to generate employee username
        console.log((generatedUsername))

        const generatedId = generate_employee_id(company_name, idNumber); //Calling function to generate employee id
        console.log(generatedId)

        let generatedPassword = generate_password(10); //Calling function to generate employee password
        console.log(generatedPassword);

        //Password Hashing
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(generatedPassword, salt);
    
        await staff_register_schema.create({
            id_num: idNumber, employee_name, gender, email, contact_no, alternate_contact, dob, country, state, city, address, zip_code, employee_id: generatedId, portal_type, department, designation, salary, grade_pay, doj, company_name, project_name, username: generatedUsername, password: secPass
        });

        sendEmployeeInfo(generatedUsername, generatedPassword, generatedId, email)
    
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
            return res.status(401).json({success, message: "Please try to login with correct credentials"});
        }
    
        const passwordCompare = await bcrypt.compare(password, employee_user.password); //Comparing hashed password
        if(!passwordCompare){
            return res.status(401).json({success, message: "Please try to login with correct credentials"});
        }
    
        const data = {
            employee_user:{
                id: employee_user.id
            }
        }    
    
        const authToken = jwt.sign(data, JWT_SECRET); // Generating a JWT Token for further authentication and authorization
        success = true;
        return res.status(200).json({success, authToken, employee_user});
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({message: "Internal Server Error"});
        }
}

const { body, validationResult } = require('express-validator');

//Validation for staff entry using express-validator

exports.employeeFormValidation = [
    body('employee_name', 'Enter a valid name').isString().exists(),
    body('gender', 'Enter a valid gender').isString().exists(),
    body('email', 'Enter a valid email').isEmail().exists(),
    body('contact_no', 'Enter a valid contact number').isMobilePhone().exists(),
    body('alternate_contact', 'Enter a valid contact number').isMobilePhone().exists(),
    body('dob', 'Enter a valid date').isDate().exists(),
    body('country', 'Enter a valid address').isString().exists(),
    body('state', 'Enter a valid address').isString().exists(),
    body('city', 'Enter a valid address').isString().exists(),
    body('address', 'Enter a valid address').isString().exists(),
    body('zip_code', 'Enter a valid zip code').isNumeric().exists(),
    body('portal_type', 'Enter a vaild portal type').isString().exists(),
    body('department', 'Enter a valid department').isString().exists(),
    body('designation', 'Enter a valid designation').isString().exists(),
    body('salary', 'Enter a valid salary').isNumeric().exists(),
    body('grade_pay', 'Enter a valid grade pay').isNumeric().exists(),
    body('doj', 'Enter a valid doj').isDate().exists(),
    body('company_name', 'Enter a valid company name').isString().exists(),
    body('project_name', 'Enter a valid project name').isString().exists(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]

exports.employeeLoginValidation = [
    body('username', 'Enter a valid username').isString().exists(),
    body('password', 'Enter a valid password').isString().exists(),
    (req, res, next)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()});
        }
        next();
    }
]
const express = require('express');
const { employeeFormValidation, employeeLoginValidation } = require('../validation/employeeValidation');
const { employeeRegister, employeeLogin, allEmployeesData } = require('../controllers/employee');
const { employeeFormData } = require('../controllers/generalData');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', employeeFormValidation, employeeRegister); //Router for staff registration
router.post('/login', employeeLoginValidation, employeeLogin); //Router for staff login
router.get('/generaldata', authMiddleware, employeeFormData); //Router for general employee form data
router.get('/allemployees', authMiddleware, allEmployeesData); //Router for all employees data



module.exports = router;
const express = require('express');
const { staff_entry_validation, staff_login_validation } = require('../validation/staff');
const { staff_register, staff_login } = require('../controllers/staff');
const { staffData } = require('../controllers/devData');
const router = express.Router();

router.post('/staffentry', staff_entry_validation, staff_register); //Router for staff registration
router.post('/login', staff_login_validation, staff_login); //Router for staff login
router.get('/staffdata', staffData) //Router for staff form data


module.exports = router;
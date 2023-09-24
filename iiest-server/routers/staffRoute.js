const express = require('express');
const { staff_entry_validation, staff_login_validation } = require('../validation/staff');
const { staff_register, staff_login } = require('../controllers/staff');
const router = express.Router();

router.post('/staffentry', staff_entry_validation, staff_register); //Route for staff registration
router.post('/login', staff_login_validation, staff_login); //Route for staff login


module.exports = router;
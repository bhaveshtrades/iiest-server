const express = require('express');
const { fboValidation } = require('../validation/fbo');
const { fbo_register } = require('../controllers/fbo');

const router = express.Router();


//Router for FBO registration form
router.post('/register', fboValidation, fbo_register);

module.exports = router;
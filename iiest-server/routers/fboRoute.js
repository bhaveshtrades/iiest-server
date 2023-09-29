const express = require('express');
const { fboFormValidation } = require('../validation/fboValidation');
const { fboRegister } = require('../controllers/fbo');
const { fboFormData } = require('../controllers/generalData');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/register', fboFormValidation, fboRegister); //Router for FBO registration form
router.get('/generaldata', authMiddleware, fboFormData); //Router for general FBO form data

module.exports = router;
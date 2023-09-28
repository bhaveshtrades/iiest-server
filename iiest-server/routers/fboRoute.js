const express = require('express');
const { fboValidation } = require('../validation/fbo');
const { fbo_register } = require('../controllers/fbo');
const { fboData } = require('../controllers/devData');
const authMiddleware = require('../middleware/auth');

const router = express.Router();


router.post('/register', fboValidation, fbo_register); //Router for FBO registration form
router.get('/fboData', authMiddleware, fboData); //Router for FBO form data

module.exports = router;
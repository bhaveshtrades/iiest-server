const express = require('express');
const { fboFormValidation } = require('../validation/fboValidation');
const { fboRegister, allFBOData } = require('../controllers/fbo');
const { fboFormData } = require('../controllers/generalData');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/allfbodata', authMiddleware, allFBOData); // Router for registered FBO Data
router.post('/fboregister', authMiddleware, fboFormValidation, fboRegister); //Router for FBO registration form
router.get('/fbogeneraldata', authMiddleware, fboFormData); //Router for general FBO form data

module.exports = router;
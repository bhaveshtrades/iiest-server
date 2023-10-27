const express = require('express');
const { fboFormValidation } = require('../validation/fboValidation');
const { fboRegister, allFBOData, deleteFbo, editFbo } = require('../controllers/fbo');
const { fboFormData } = require('../controllers/generalData');
const { addRecipient } = require('../controllers/recipient');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/allfbodata', authMiddleware, allFBOData); // Router for registered FBO Data
router.post('/fboregister', authMiddleware, fboFormValidation, fboRegister); //Router for FBO registration form
router.delete('/deleteFbo/:id', authMiddleware, deleteFbo); //Router for deleting FBO
router.put('/editFbo/:id', authMiddleware, editFbo); //Router for editing FBO data
router.get('/fbogeneraldata', authMiddleware, fboFormData); //Router for general FBO form data
router.patch('/fbo/recipientDetails/:id', addRecipient); //Router for adding shop or recipientdata

module.exports = router;
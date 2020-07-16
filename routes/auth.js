// authentication
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/AuthController');
const auth = require('../middleware/auth');

// login
// api/auth
router.post('/', 
    authController.autenticateUser
);

// get autenticated user
router.get('/',
    auth,
    authController.userAutenticated
);
module.exports = router;
const express = require('express');
// controller functions
const { loginClient, signupClient } = require('../controllers/clientController')


const router = express.Router()
// login route
router.get('/login', loginClient)

// signup route
router.post('/signup', signupClient)

module.exports = router
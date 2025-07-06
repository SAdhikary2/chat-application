const express = require ('express')
const registerUser = require('../controller/registerUser')

const router = express.Router();

//User Api 
router.post('/register', registerUser)

module.exports = router ;
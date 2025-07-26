const express = require('express');
const { signup, login } = require('../controllers/authControllers');
const verify = require('../middleware/authMiddleware')

const router = express.Router();
router.post('/signup', signup);
router.post('/login', verify, login);

module.exports = router;

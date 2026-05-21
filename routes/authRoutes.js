const expresss = require('express');
const router = expresss.Router();
const authController = require('../controllers/AuthControllers');
require('dotenv').config();     


router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/protected', (req, res) => {
    res.json({ message: 'This is a protected route' });
});



module.exports = router;
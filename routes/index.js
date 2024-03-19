const express = require('express');

const router = express.Router();
const homeController =  require('../controllers/home_controller.js')
console.log('router loaded');


router.get('/',homeController.home );
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));

module.exports = router ;
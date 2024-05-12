const express = require('express');

const router = express.Router();
const homeController =  require('../controllers/home_controller.js')
console.log('router loaded');

console.log(homeController.home);
router.get('/',homeController.home );
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api',require('./api'));


module.exports = router ;


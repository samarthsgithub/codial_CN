const express = require('express');
const router = express.Router();

const postController = require('../controllers/post_controller.js');
router.get('/post1', postController.post1);

module.exports = router;
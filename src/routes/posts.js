const express = require('express');
const postCtrl = require('../controllers/posts.controller');
const authenticateToken = require('../middleware/authToken');

const router = express.Router();

router.post('/create', authenticateToken, postCtrl.createPost);
router.put('/edit/:postId', authenticateToken, postCtrl.editPost);
router.delete('/delete/:postId', authenticateToken, postCtrl.deletePost);
router.get('/search', postCtrl.searchPost);
router.get('/fetch', postCtrl.fetchPostsByDate);

module.exports = router;

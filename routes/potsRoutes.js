import express from 'express';
const router = express.Router();

import {createPost,deletePost,getAllPosts,updatePost, getMyAllPosts} from '../controllers/postController.js'

// all routes !!!!

router.route('/').post(createPost).get(getAllPosts);
router.route('/AllMyPosts').get(getMyAllPosts);
router.route('/:id').delete(deletePost).patch(updatePost);

export default router;
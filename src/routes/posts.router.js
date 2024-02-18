import express from 'express';
import { PostsController } from '../controllers/posts.controller.js';

const router = express.Router();
const postsController = new PostsController();

router.post('/posts', postsController.createPost);

router.get('/posts', postsController.getPosts);

export default router;

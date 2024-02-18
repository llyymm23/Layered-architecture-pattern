import express from 'express';
import { PostsController } from '../controllers/posts.controller.js';

const router = express.Router();
const postsController = new PostsController();

router.post('/', postsController.createPost);

router.get('/', postsController.getPosts);

export default router;

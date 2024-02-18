import { PostsService } from '../services/posts.service.js'

export class PostsController {
    postsService = new PostsService();

    getPosts = async (req, res, next) => {
        try {
            const posts = await this.postsService.findAllPosts();

            return res.status(200).json({ data: posts });

        } catch (err) {
            next(err);
        }

    }

    createPost = async (req, res, next) => {
        try {
            const { nickname, password, title, content } = req.body;

            const createdPost = await this.postsService.createPost(
                nickname, password, title, content
            );

            return res.status(201).json({ data: createdPost });

        } catch (err) {
            next(err);
        }
    }
}

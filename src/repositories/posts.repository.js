import { prisma } from '../utils/prisma/index.js'

export class PostsRepository {
    findAllPosts = async () => {
        const posts = await prisma.posts.findMany();

        return posts;
    };

    createPost = async (nickname, password, title, content) => {
        const createdPost = await prisma.posts.create({
            data: {
                nickname, password, title, content,
            }
        });

        return createdPost;
    };

    findPostById = async (postId) => {
        const post = await prisma.posts.findUnique({
            where: { postId: +postId },
        })

        return post;
    };

    updatePost = async (postId, password, title, content) => {
        const updatedPost = await prisma.posts.update({
            where: {
                postId: +postId,
                password: password,
            },
            data: {
                title,
                content,
            },
        });

        return updatedPost;
    };

    deletePost = async (postId, password) => {
        const deletedPost = await prisma.posts.delete({
            where: {
                postId: +postId,
                password: password,
            },
        });

        return deletedPost;
    };
}

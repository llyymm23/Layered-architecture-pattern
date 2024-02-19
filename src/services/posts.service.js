import { PostsRepository } from '../repositories/posts.repository.js'

export class PostsService {
    postsRepository = new PostsRepository();

    findAllPosts = async () => {
        const posts = await this.postsRepository.findAllPosts();

        //게시글을 생성 날짜로부터 내림차순 정렬
        posts.sort((a, b) => {
            return b.createdAt - a.createdAt;
        });

        // password, content를 뺀 상태로, Controller에게 Responser를 전달
        return posts.map((post) => {
            return {
                postId: post.postId,
                nickname: post.nickname,
                title: post.title,
                createdAt: post.createdAt,
                updatedAt: post.updatedAt,
            };
        });
    };

    createPost = async (nickname, password, title, content) => {
        const createdPost = await this.postsRepository.createPost(
            nickname, password, title, content
        );

        return {
            postId: createdPost.postId,
            nickname: createdPost.nickname,
            title: createdPost.title,
            content: createdPost.content,
            createdAt: createdPost.createdAt,
            updatedAt: createdPost.updatedAt,
        };
    };

    findPostById = async (postId) => {
        const post = await this.postsRepository.findPostById(postId);

        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };

    updatePost = async (postId, password, title, content) => {
        const post = await this.postsRepository.findPostById(postId);
        if (!post) throw new Error('존재하지 않는 게시글입니다.');

        await this.postsRepository.updatePost(postId, password, title, content);

        const updatedPost = await this.postsRepository.findPostById(postId);

        return {
            postId: updatedPost.postId,
            nickname: updatedPost.nickname,
            title: updatedPost.title,
            content: updatedPost.content,
            createdAt: updatedPost.createdAt,
            updatedAt: updatedPost.updatedAt,
        };
    };

    deletePost = async (postId, password) => {
        const post = await this.postsRepository.findPostById(postId);
        if (!post) throw new Error('존재하지 않는 게시글입니다.');

        await this.postsRepository.deletePost(postId, password);

        return {
            postId: post.postId,
            nickname: post.nickname,
            title: post.title,
            content: post.content,
            createdAt: post.createdAt,
            updatedAt: post.updatedAt,
        };
    };
};

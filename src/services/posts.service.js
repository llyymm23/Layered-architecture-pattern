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
            }
        })
    }

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
        }
    }
}

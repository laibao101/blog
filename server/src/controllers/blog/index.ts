import * as Koa from 'koa'
import * as Router from 'koa-router';
import PostController from './PostController';
import CommentController from './CommentController';

export const path = '/blog';

export default class Blog extends Router {
    constructor() {
        super();
        this._route();
    }

    private _route(): void {
        const postController = new PostController();
        const commentController = new CommentController();
        this.get('/posts', postController.getPosts.bind(postController));
        this.get('/post', postController.getPost.bind(postController));
        this.get('/like', postController.likePost.bind(postController));
        this.post('/comment', commentController.addComment.bind(commentController));
    }
}

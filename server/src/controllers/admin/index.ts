import * as Koa from 'koa'
import * as Router from 'koa-router';
import PostController from './PostController';
import UserController from './UserController';
import CategoryController from './CategoryController';

import Auth from '../basic';

export const path = '/api/admin';

export default class Blog extends Router {
    constructor() {
        super();
        this._route();
    }

    private _route(): void {
        const postController = new PostController();
        const userController = new UserController();
        const categoryController = new CategoryController();
        this.get('/posts', postController.getPosts.bind(postController));
        this.get('/post', postController.getPost.bind(postController));
        this.post('/post', postController.addPost.bind(postController));
        this.post('/editPost', postController.editPost.bind(postController));
        this.get('/delPost', postController.deletePost.bind(postController));
        this.get('/enableUser', userController.enableUser.bind(userController));
        this.get('/disableUser', userController.disableUser.bind(userController));
        this.get('/users', userController.getUsers.bind(userController));
        this.get('/categories', categoryController.getCategories.bind(categoryController));
        this.get('/enableCategory', categoryController.enableCategory.bind(categoryController));
        this.get('/disableCategory', categoryController.disableCategory.bind(categoryController));
        this.post('/category', categoryController.addCategory.bind(categoryController));
        this.get('/exportExcel', postController.downloadPost.bind(postController));
    }
}

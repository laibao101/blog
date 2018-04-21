import * as Koa from 'koa'
import * as Router from 'koa-router';
import PostModel from '../../models/PostModel';
import CommentModel from '../../models/CommentModel';

export default class PostController {
    private _post: PostModel = new PostModel();
    private _comment: CommentModel = new CommentModel();
    private _ok(ctx: Koa.Context, sendData: object = {}, msg: string = ''): void {
        ctx.body = {
            code: 0,
            msg,
            data: {
                ...sendData,
            },
        };
    }

    private _error(ctx: Koa.Context, msg: string = ''): void {
        ctx.body = {
            code: 1,
            msg,
            data: {},
        };
    }
    public async getPosts(ctx: Koa.Context, next: any): Promise<void> {
        try {
            const { request } = ctx;
            const { query } = request;
            const { page = 1, limit = 10 } = query;
            const posts = await this._post.getPosts((page - 1) * limit, Number(limit));
            const totalRes = await this._post.getPostsTotal();
            for (let i =0, len = posts.length; i < len; i++) {
                const commentTotal = await this._comment.countByPostId(posts[i].id) || 0;
                posts[i].comment = commentTotal[0].total;
            }
            this._ok(ctx, {
                posts,
                total: totalRes[0].total,
            });
        } catch (error) {
            next(error);
        }
    }

    public async getPost(ctx: Koa.Context, next: any): Promise<void> {
        const { request } = ctx;
        const { query } = request;
        const { id } = query;
        if (!id) {
            this._error(ctx, 'id错误');
            return;
        }
        try {
            const post = await this._post.getPost(id);
            const comments = await this._comment.getCommentsById(id);
            this._ok(ctx, {
                post:post[0],
                comments,
            });
        } catch (error) {
            next(error);
        }
    }

    public async likePost(ctx: Koa.Context, next: any): Promise<void> {
        const { request } = ctx;
        const { query } = request;
        const { id } = query;
        if (!id) {
            this._error(ctx, '缺少id');
            return;
        }
        try {
            const result = await this._post.likePost(id);
            if (result.affectedRows > 0) {
                this._ok(ctx, {}, '点赞成功');
                return;
            }
            this._error(ctx, '找不到post');
        } catch (err) {
            next(err);
        }
    }
}

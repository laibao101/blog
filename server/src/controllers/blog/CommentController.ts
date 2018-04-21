import * as Koa from 'koa'
import * as Router from 'koa-router';
import CommentModel from './../../models/CommentModel';

export default class CommentController {
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
    public async addComment(ctx: Koa.Context, next: any): Promise<void> {
        const { request } = ctx;
        const { body } = request;
        if (!body.id) {
            this._error(ctx, '缺少id');
            return;
        } else if (!body.comment) {
            this._error(ctx, '缺少comment');
            return;
        }

        try {
            body.time = Date.now();
            body.content = body.comment;
            const result = await this._comment.addComment(body);
            if (result.affectedRows > 0) {
                this._ok(ctx, {}, '评论成功')
                return;
            }
            this._error(ctx, '评论失败');
        } catch (err) {
            console.log(err);
            next(err);
        }
    }
}

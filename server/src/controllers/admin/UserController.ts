import * as Koa from 'koa'
import * as Router from 'koa-router';
import UserModel from './../../models/UserModel';

interface IInsert {
    affectedRows: number;
}

export default class UserController {
    private _user: UserModel = new UserModel();

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

    private _changeUserStatus(uid: string, status: number): Promise<IInsert> {
        return this._user.setUserStatus(uid, status);
    }

    public async enableUser(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {uid} = query;
        if (!uid) {
            this._error(ctx, 'uid错误');
            return;
        }
        try {
            const result = await this._changeUserStatus(uid, 1);
            if (result.affectedRows) {
                this._ok(ctx, {}, '启用成功');
            }
        } catch (err) {
            next(err);
        }
    }

    public async disableUser(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {uid} = query;
        if (!uid) {
            this._error(ctx, 'uid错误');
            return;
        }
        try {
            const result = await this._changeUserStatus(uid, 0);
            if (result.affectedRows) {
                this._ok(ctx, {}, '禁用成功');
            }
        } catch (err) {
            next(err);
        }
    }

    public async getUsers(ctx: Koa.Context, next: any): Promise<void> {
        try {
            const users = await this._user.getUsers();
            this._ok(ctx, {users});
        } catch (err) {
            next(err);
        }
    }
}

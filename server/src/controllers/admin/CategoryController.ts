import * as Koa from 'koa'
import CategoryModel from './../../models/CategoryModel';
import {getUuid} from '../../util';

interface IInsert {
    affectedRows: number;
}

export default class CategoryController {
    private _category: CategoryModel = new CategoryModel();

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

    private _changeCategoryStatus(id: number, status: number): Promise<IInsert> {
        return this._category.setCategoryStatus(id, status);
    }

    public async getCategories(ctx: Koa.Context, next: any): Promise<void> {
        try {
            const {request} = ctx;
            const {query} = request;
            const {page = 0, limit = 5} = query;
            const categories = await this._category.getCategories(page * limit, limit);
            const totalRes = await this._category.getCategoriesTotal();
            this._ok(ctx, {
                categories,
                total: totalRes[0].total,
            });
        } catch (err) {
            next(err);
        }
    }

    public async enableCategory(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {id} = query;
        if (!id) {
            this._error(ctx, '缺少id');
            return;
        }
        try {
            const result = await this._changeCategoryStatus(id, 1);
            if (result.affectedRows) {
                this._ok(ctx, {}, '启用成功');
            }
        } catch (err) {
            next(err);
        }
    }

    public async disableCategory(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {id} = query;
        if (!id) {
            this._error(ctx, '缺少id');
            return;
        }
        try {
            const result = await this._changeCategoryStatus(id, 0);
            if (result.affectedRows) {
                this._ok(ctx, {}, '启用成功');
            }
        } catch (err) {
            next(err);
        }
    }

    public async addCategory(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {body} = request;
        if (!body.name) {
            this._error(ctx, '请填写分类名');
            return;
        } else if (body.name > 20) {
            this._error(ctx, '分类名超过20个字符');
            return;
        }
        try {
            body.categoryId = getUuid();
            const result = await this._category.insertCategory(body);
            if (result.affectedRows) {
                this._ok(ctx, {}, '添加category成功');
                return;
            }
            this._error(ctx, '添加category失败');
        } catch (err) {
            next(err);
        }
    }
}

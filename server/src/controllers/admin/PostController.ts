import * as Koa from 'koa'
import * as xss from 'xss';
import * as nodeExcel from 'excel-export';
import * as moment from 'moment';
import IPost from '../../interface/IPost';
import PostModel from '../../models/PostModel';
interface IDownloadPost extends IPost {
    uid: string;
    uname: string;
    categoryName: string;
}
interface ICheckPost {
    isValid: boolean;
    code: number;
    msg: string;
}

export default class PostController {
    private _post: PostModel = new PostModel();

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

    private _checkPost(data: IPost): ICheckPost {
        const title = data.title;
        const titleResult = this._checkItem(title, 20, '标题');
        if (!titleResult.isValid) {
            return titleResult;
        }
        const abstract = data.abstract;
        const abstractResult = this._checkItem(abstract, 50, '摘要');
        if (!abstractResult.isValid) {
            return abstractResult;
        }
        const content = data.content;
        if (!content) {
            return {
                isValid: false,
                code: 1,
                msg: `请输入内容`,
            };
        }
        const category = data.category;
        if (!category) {
            return {
                isValid: false,
                code: 1,
                msg: `请选择分类`,
            };
        }

        return {
            isValid: true,
            code: 0,
            msg: `全部校验通过`,
        }
    }

    private _checkItem(field: string, length: number, fileName: string): ICheckPost {
        if (!field) {
            return {
                isValid: false,
                code: 1,
                msg: `请输入${fileName}`,
            };
        } else if (field.length > length) {
            return {
                isValid: false,
                code: 1,
                msg: `${fileName}过长`,
            };
        }
        return {
            isValid: true,
            code: 0,
            msg: '',
        };
    }
    
    private  _formatTime(time:string):string  {
        if (time === '0') {
            return '';
        }
        return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss');
    };

    public async downloadPost(ctx: Koa.Context, next: any):Promise<void> {
        try {
            const posts = await this._post.getAllPosts();
            const conf:any = {};
            conf.cols= [{
                caption: 'id',
                type: 'number',
                width: 30,
            }, {
                caption: 'title',
                type: 'string',
                width: 30,
            }, {
                caption: 'abstract',
                type: 'string',
                width: 30,
            }, {
                caption: 'content',
                type: 'string',
                width: 30,
            }, {
                caption: 'ctime',
                type: 'string',
                width: 130,
            }, {
                caption: 'mtime',
                type: 'string',
                width: 130,
            }, {
                caption: 'uname',
                type: 'string',
                width: 30,
            }, {
                caption: 'uid',
                type: 'string',
                width: 30,
            }, {
                caption: 'categoryName',
                type: 'string',
                width: 30,
            }, {
                caption: 'status',
                type: 'string',
                width: 30,
            }];
            conf.rows = posts.map((item:IDownloadPost) => {
                const status = item.status === 0 ? '禁用' : '启用';
                return [item.id, item.title, item.abstract, item.content, this._formatTime(item.ctime), this._formatTime(item.mtime),
                    item.uname, item.uid, item.categoryName, status,
                ];
            });
            try {
                const result = await nodeExcel.execute(conf);
                ctx.set('Content-Type', 'application/vnd.openxmlformats');
                const nowTime = Date.now();
                ctx.set('Content-Disposition', 'attachment; filename=' + `posts${this._formatTime(`${nowTime}`)}.xlsx`);
                const buffer = new Buffer(result, 'binary');
                ctx.body = buffer;
            } catch (err) {
                next(err);
            }
        } catch (err) {
            next(err);
        }
    }

    public async getPosts(ctx: Koa.Context, next: any): Promise<void> {
        try {
            const {request} = ctx;
            const {query} = request;
            const {page = 1, limit = 10} = query;
            const posts = await this._post.getPosts(page * limit, Number(limit));
            const totalRes = await this._post.getPostsTotal();
            this._ok(ctx, {
                posts,
                total: totalRes[0].total,
            });
        } catch (error) {
            next(error);
        }
    }

    public async getPost(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {id} = query;
        if (!id) {
            this._error(ctx, 'id错误');
            return;
        }
        try {
            const post = await this._post.getPost(id);
            this._ok(ctx, {
                post: post[0],
            });
        } catch (error) {
            next(error);
        }
    }

    public async editPost(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {body} = request;
        const checkResult = this._checkPost(body);
        if (!checkResult.isValid) {
            this._error(ctx, checkResult.msg);
            return;
        }
        if (!body.id) {
            this._error(ctx, '缺少参数id');
            return;
        }
        try {
            const mtime = Date.now();
            body.mtime = mtime;
            const result = await this._post.updatePost(body);
            if (result.affectedRows) {
                this._ok(ctx, {}, '编辑post成功');
                return;
            } else {
                this._error(ctx, '找不到post');
            }
        } catch (err) {
            next(err);
        }
    }

    public async addPost(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {body} = request;
        const checkResult = this._checkPost(body);
        if (!checkResult.isValid) {
            this._error(ctx, checkResult.msg);
            return;
        }
        try {
            const author = body.user;
            const ctime = Date.now();
            body.author = author;
            body.ctime = ctime;
            body.status = 1;
            body.content = xss(body.content);
            const result = await this._post.insertPost(body);
            if (result.affectedRows) {
                this._ok(ctx, {}, '添加post成功')
                return;
            }
            this._error(ctx, '添加post失败');
        } catch (err) {
            next(err);
        }
    }

    public async deletePost(ctx: Koa.Context, next: any): Promise<void> {
        const {request} = ctx;
        const {query} = request;
        const {id} = query;
        try {
            const result = await this._post.deletePost(id);
            if (result.affectedRows > 0) {
                this._ok(ctx, {}, '删除post成功');
            } else {
                this._error(ctx,'找不到post');
            }
        } catch (err) {
            next(err);
        }
    }
}

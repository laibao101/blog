import * as jwt from 'jsonwebtoken';
import * as util from 'util';
import * as Koa from 'koa'
import * as Router from 'koa-router';
import secret from '../../config/secret';
import UserModel from './../../models/UserModel';
import { getUuid, md5WithSalt } from '../../util';
import IUser from './../../interface/IUser';

const verify = util.promisify(jwt.verify);

export const path = '/api';

interface ICheckUser {
    isValid: boolean;
    code: number;
    msg: string;
}

interface IRegistData {
    username: string;
    password: string;
}

export default class Auth extends Router {
    public static async verify(ctx: Koa.Context, next:any): Promise<void> {
        const token = ctx.header.auth;
        if (token) {
            const payload = await verify(token, secret);
            ctx.body = {
                payload,
            }
            await next();
        } else {
            ctx.body = {
                code: 401,
                msg: '没有权限',
                data: {},
            }
        }
    }
    private _user: UserModel = new UserModel();
    constructor() {
        super();
        this._route();
    }

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

    private _route(): void {
        this.post('/login', this._login.bind(this));
        this.post('/regist', this._register.bind(this));
    }

    private async _register(ctx: Koa.Context, next: () => void): Promise<void> {
        const { request } = ctx;
        const { body } = request;
        const checkResult = this._checkUser(body);
        if (!checkResult.isValid) {
            this._error(ctx, checkResult.msg)
            return;
        }

        try {
            const users = await this._user.getUserByName(body.username);
            const isUserExist = users[0].total > 0;
            if (isUserExist) {
                this._error(ctx, '用户名已经存在');
                return;
            }
        } catch (err) {
            next();
            return;
        }

        try {
            const uid = getUuid();
            const nickname = getUuid();
            const userData: IUser = {
                uid,
                uname: `${body.username}`,
                password: md5WithSalt(body.password),
                nickname,
                status: 1,
                id: 0,
                avatar: '',
            };
            const result = await this._user.insertUser(userData);
            const userToken = {
                uid,
            }
            const token = jwt.sign(userToken, secret, { expiresIn: '1h' });
            if (result.affectedRows) {
                this._ok(ctx, {
                    ...{
                        name: body.username,
                        uid,
                        nickname,
                        token,
                    },
                });
            }
        } catch (err) {
            next();
        }
    }

    private _checkUser(data: IRegistData): ICheckUser {
        if (!data.username) {
            return {
                isValid: false,
                code: 1,
                msg: '请输入用户名',
            };
        } else if (!data.password) {
            return {
                isValid: false,
                code: 1,
                msg: '请输入密码',
            };
        }

        return {
            isValid: true,
            code: 0,
            msg: '',
        }
    }


    private async _login(ctx: Koa.Context): Promise<void> {
        const { request } = ctx;
        const { body } = request;
        const checkRes = this._checkUser(body);
        if (!checkRes.isValid) {
            this._error(ctx, checkRes.msg);
        }
        const { username, password } = body;
        const user = await this._user.getUser(username);
        if (user.password === md5WithSalt(password)) {
            const userToken = {
                uid: user.uid,
            }
            const token = jwt.sign(userToken, secret, { expiresIn: '1h' });
            this._ok(ctx, {
                ...{
                    name: user.uname,
                    uid: user.uid,
                    nickname: user.nickname,
                    token,
                },
            }, '登录成功')
        } else {
            this._error(ctx, '登录失败');
        }
    }
}

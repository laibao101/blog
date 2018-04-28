import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as glob from 'glob';
import * as logger from 'koa-morgan';
import * as bodyParser from 'koa-bodyparser';
import * as koaJwt from 'koa-jwt';
import secret from './config/secret';

enum ENV {
    DEV = 'dev',
    PROD = 'prod',
}
const errorHandler = (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.body = {
                code: 401,
                msg: '没有权限',
                data: {},
            };
        } else {
            throw err;
        }
    });
}

interface IGetToken extends koaJwt.Options {
    headers: Koa.Context
}
class App {
    private _app: Koa;
    private _env: ENV;
    private _port: number;
    private _router: Router;
    private _controllers: string[];
    constructor() {
        this._app = new Koa();
        this._port = this._getPort();
        this._env = this._getEnv();
        this._setParser();
        this._app.use(errorHandler);
        this._router = new Router();
        this._controllers = this._getControllers();
        this._setLog();
        this._setToken();
        this._route();
        this._listen();
    }
    private _setLog(): void {
        if (this._env === ENV.DEV) {
            this._app.use(logger('dev'));
        }
    }
    private _setToken(): void {
        this._app.use(koaJwt({
            secret,
            getToken: (ctx: IGetToken): string => {
                if (ctx.headers.auth) {
                    return ctx.headers.auth;
                } else {
                    return '543543';
                }
            },
        }).unless({
            path: [/^\/blog/, /^\/api\/login/, /^\/api\/regist/, /^\/api\/admin/],
        }));
    }
    private _setParser(): void {
        this._app.use(bodyParser());
    }
    private _getControllers(): string[] {
        return glob.sync(`${__dirname}/controllers/**/index.*`);
    }
    private _route(): void {
        this._controllers.forEach((controllerPath) => {
            import(controllerPath)
                .then(controller => {
                    const router = new controller.default();
                    const { path } = controller
                    this._router.use(path, router.routes(), router.allowedMethods());
                });
        });
        this._app.use(this._router.routes()).use(this._router.allowedMethods());
    }
    private _getEnv(): ENV {
        return process.env.NODE_ENV === ENV.DEV ? ENV.DEV : ENV.PROD;
    }

    private _getPort(): number {
        return Number(process.env.PORT) || 3000;
    }

    private _listen(): void {
        this._app.listen(this._port, () => {
            console.log(`app is runing at port ${this._port}`);
        });
    }
}

export default new App();

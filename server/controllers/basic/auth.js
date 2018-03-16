const Router = require('express').Router;
const passport = require('passport');
const {getUuid, md5WithSalt} = require('../../util');
const User = require('../../models/user');
const router = new Router();

const requireLogin = async (req, res, next) => {
    if (req.user) {
        await next();
    } else {
        await res.status(401).json({
            code: 1,
            msg: '请登录',
            data: {}
        });
    }
};

router.post('/login', function (req, res, next) {
    try {
        passport.authenticate('local', function (err, user) {
            console.log('local->', err, user);
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.json({
                    code: 1,
                    data: {},
                    msg: "用户名或密码错误"
                });
            }

            req.logIn(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.json({
                    code: 0,
                    data: {},
                    msg: "登录成功",
                });
            });
        })(req, res, next);
    } catch (err) {
        next(err);
    }
});

router.post('/register', async (req, res, next) => {
    const body = req.body;
    const checkResult = checkUser(body);
    if (!checkResult.isValid) {
        return res.json(checkResult);
    }

    try {
        const users = await User.getUserByName(body.username);
        const isUserExist = users[0].total > 0;
        if(isUserExist) {
            return res.json({
                code: 1,
                msg: '用户名已经存在',
                data: {}
            });
        }
    } catch (err) {
        next(err);
    }

    try {
        const uid = getUuid();
        const nickname = getUuid();
        const userData = {
            uid,
            uname: body.username,
            password: md5WithSalt(body.password),
            nickname,
        };
        await User.insertUser(userData);
        req.login(userData, (err) => {
            if (err) {
                return next(err);
            }
            res.json({
                code: 0,
                msg: '注册成功',
                data: {
                    name: body.username,
                    uid,
                    nickname,
                }
            });
        })
    }
    catch (err) {
        next(err);
    }
});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.json({
        code: 0,
        msg: '登出成功',
        data: {}
    });
});

const checkUser = (data) => {
    if (!data.username) {
        return {
            isValid: false,
            code: 1,
            msg: '请输入用户名'
        };
    } else if (!data.password) {
        return {
            isValid: false,
            code: 1,
            msg: '请输入密码'
        };
    }

    return {
        isValid: true,
        code: 0,
        msg: ''
    }
};

module.exports = {
    router,
    requireLogin,
    init: function (app) {
        app.use('/api', router);
    }
};
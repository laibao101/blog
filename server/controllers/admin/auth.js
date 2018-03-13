const Router = require('express').Router;
const passport = require('passport');
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

            req.logIn(user, function (err) {
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

router.post('/regist', function (req, res, next) {

});

router.get('/logout', function (req, res, next) {
    req.logout();
    res.json({
        code: 0,
        msg: '登出成功',
        data: {}
    });
});

module.exports = {
    router,
    requireLogin,
    init: function (app) {
        app.use('/api', router);
    }
};

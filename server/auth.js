const Router = require('express').Router;
const passport = require('passport');
const router = new Router();

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

            // if (req.user) {
            //     return res.json({
            //         code: 1,
            //         data: {},
            //         msg: "请不要重复登录"
            //     });
            // }

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

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const blog = require('./blog.router');
const admin = require('./admin.router');
const auth = require('./auth');
const config = require('./config').mysql;
const cors = require('cors');
const path = require("path");
const server = express();

server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
server.use(express.static(path.join("./build")));
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));
server.use(session({
    secret: 'blog',
    proxy: true,
    resave: true,
    saveUninitialized: true,
    rolling: true,
    unset: 'destroy',
    cookie: {secure: false, httpOnly: true, maxAge: 1000 * 30},
    store: new MysqlStore(config)
}));

require('./passport');
const passport = require('passport');
server.use(passport.initialize());
server.use(passport.session());


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
//
server.use(async (req, res, next) => {
    req.user = null;
    if (req.session.passport && req.session.passport.user) {
        try {
            // const getUserByUid = require('./model').getUserByUid;
            // const result = await getUserByUid(req.session.passport.user);
            // req.user = result[0];
            req.user = req.session.passport.user;
        } catch (err) {
            next(err);
        }
    }
    next();
});

server.use('/blog', blog);
server.use('/api/admin', requireLogin, admin);
server.use('/api', auth);

server.listen(5000, (err) => {
    if (err) {
        throw err;
    }
    console.log('> Ready on http://localhost:5000');
});

module.exports = server;

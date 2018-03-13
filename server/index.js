const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const config = require('./config/dbConfig').mysql;
const cors = require('cors');
const path = require('path');
const server = express();

// 跨域配置
server.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

// 静态资源配置(打包后访问页面)
server.use(express.static(path.join(__dirname,'build')));

// bodyparser配置
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

// session配置
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

// passport配置
const passportConfig = require('./config/passport');
const passport = require('passport');
passportConfig.init();
server.use(passport.initialize());
server.use(passport.session());

// 路由
const glob = require('glob');

const controllers = glob.sync('./server/controllers/**/*.js');
controllers.forEach(function(controller) {
    require(controller.replace("./server", ".")).init(server);
});

server.listen(5000, (err) => {
    if (err) {
        throw err;
    }
    console.log('> Ready on http://localhost:5000');
});

module.exports = server;

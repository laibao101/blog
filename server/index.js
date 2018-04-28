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
    origin: '*',
    credentials: true
}));

// 静态资源配置(打包后访问页面)
server.use(express.static(path.join(__dirname, 'build')));

// 服务端静态资源
server.use('/static', express.static(path.join(__dirname, 'uploads')));

// bodyparser配置
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: false}));

// session配置
// server.use(session({
//     secret: 'blog',
//     proxy: true,
//     resave: true,
//     saveUninitialized: true,
//     rolling: true,
//     unset: 'destroy',
//     cookie: {secure: false, httpOnly: true, maxAge: 1000 * 60 * 10},
//     store: new MysqlStore(config)
// }));

// passport配置
const passportConfig = require('./config/passport');
const passport = require('passport');
passportConfig.init();
server.use(passport.initialize());
server.use(passport.session());

// 路由
const glob = require('glob');

const controllers = glob.sync('./server/controllers/**/*.js');
controllers.forEach(function (controller) {
    require(controller.replace("./server", ".")).init(server);
});


const port = process.env.PORT || 4500;
server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log(`> Ready on http://localhost:${port}`);
});

module.exports = server;

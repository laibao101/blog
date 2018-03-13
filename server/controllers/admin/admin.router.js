const moment = require('moment');
const Router = require('express').Router;
const {md5WithSalt, getUuid} = require("../../util");
const nodeExcel = require('excel-export');
const Post = require('../../models/post');
const Category = require('../../models/category');
const User = require('../../models/user');
const {requireLogin} = require("./auth");

const router = new Router();

/**
 * 获取所有posts
 */
router.get('/posts', async (req, res, next) => {
    try {
        const page = req.query.page - 1 || 0;
        const limit = req.query.limit || 5;
        const posts = await Post.getPosts(page * limit, Number(limit));
        const totalRes = await Post.getPostsTotal();
        return res.json({
            code: 0,
            msg: '获取posts成功',
            data: {
                posts,
                total: totalRes[0].total
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 获取单个post的详细信息
 */
router.get('/post', async (req, res, next) => {
    const postId = req.query.id;
    if (!postId) {
        return res.json({
            code: 1,
            msg: 'id错误',
            data: {}
        });
    }
    try {
        const post = await Post.getPost(postId);
        return res.json({
            code: 0,
            msg: '获取post成功',
            data: {
                post: post[0]
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 编辑post
 */
router.post('/editPost', async (req, res, next) => {
    const body = req.body;
    const checkResult = checkPost(body);
    if (!checkResult.isValid) {
        res.json(checkResult);
    }
    if (!body.id) {
        res.json({
            code: 1,
            data: {},
            msg: '缺少参数id'
        });
    }
    try {
        const mtime = Date.now();
        body.mtime = mtime;
        const result = await Post.updatePost(body);
        if (result.affectedRows > 0) {
            res.json({
                code: 0,
                data: {},
                msg: '编辑post成功'
            });
        } else {
            res.json({
                code: 1,
                data: {},
                msg: '找不到post'
            });
        }
    } catch (err) {
        next(err);
    }
});

/**
 * 启用user
 */
router.get('/enableUser', async (req, res, next) => {
    const uid = req.query.uid;
    if (!uid) {
        return res.json({
            code: 1,
            msg: 'uid错误',
            data: {}
        });
    }
    try {
        await changeUserStatus(uid, 1);
        return res.json({
            code: 0,
            msg: '启用成功',
            data: {}
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 禁用user
 */
router.get('/disableUser', async (req, res, next) => {
    const uid = req.query.uid;
    if (!uid) {
        return res.json({
            code: 1,
            msg: 'uid错误',
            data: {}
        });
    }
    try {
        await changeUserStatus(uid, 0);
        return res.json({
            code: 0,
            msg: '禁用成功',
            data: {}
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 获取所有user
 */
router.get('/users', async (req, res, next) => {
    try {
        const users = await User.getUsers();
        return res.json({
            code: 0,
            msg: '获取users成功',
            data: users
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 添加user
 */
router.post('/user', async (req, res, next) => {
    const body = req.body;
    const checkResult = checkUser(body);
    if (!checkResult.isValid) {
        return res.json(checkResult);
    }

    try {
        const userData = {
            uid: getUuid(),
            uname: body.username,
            password: md5WithSalt(body.password),
            nickname: getUuid()
        };
        await User.insertUser(userData);
        res.json({
            code: 0,
            msg: '添加用户成功',
            data: {}
        });
    }
    catch (err) {
        next(err);
    }
});

/**
 * 获取所有分类
 */
router.get('/categories', async (req, res, next) => {
    try {
        const page = req.query.page - 1 || 0;
        const limit = req.query.limit || 5;
        const categories = await Category.getCategories(page * limit, limit);
        const totalRes = await Category.getCategoriesTotal();
        return res.json({
            code: 0,
            msg: '获取categories成功',
            data: {
                categories,
                total: totalRes[0].total
            }
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 添加post
 */
router.post('/post', async (req, res, next) => {
    const body = req.body;
    const checkResult = checkPost(body);
    if (!checkResult.isValid) {
        res.json(checkResult);
    }
    try {
        const author = req.user;
        const ctime = Date.now();
        body.author = author;
        body.ctime = ctime;
        body.status = 1;
        const result = await Post.insertPost(body);
        if (result.insertId) {
            return res.json({
                code: 0,
                data: {},
                msg: '添加post成功'
            });
        }
        res.json({
            code: 1,
            data: {},
            msg: '添加post失败'
        });
    } catch (err) {
        next(err);
    }
});

/**
 * 删除post
 */
router.get('/delPost', async (req, res, next) => {
    const postId = req.query.id;
    try {
        const result = await Post.deletePost(postId);
        if (result.affectedRows > 0) {
            res.json({
                code: 0,
                msg: '删除post成功',
                data: {}
            });
        } else {
            res.json({
                code: 1,
                msg: '找不到post',
                data: {}
            });
        }
    } catch (err) {
        next(err);
    }
});

router.get('/enableCategory', async (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        res.json({
            code: 1,
            msg: '缺少id',
            data: {}
        });
    }
    try {
        await changeCategoryStatus(id, 1);
        return res.json({
            code: 0,
            msg: '启用成功',
            data: {}
        });
    } catch (err) {
        next(err);
    }
});


router.get('/disableCategory', async (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        res.json({
            code: 1,
            msg: '缺少id',
            data: {}
        });
    }
    try {
        await changeCategoryStatus(id, 0);
        return res.json({
            code: 0,
            msg: '禁用成功',
            data: {}
        });
    } catch (err) {
        next(err);
    }
});

router.post('/category', async (req, res, next) => {
    const body = req.body;
    if (!body.name) {
        res.json({
            code: 1,
            msg: '请填写分类名',
            data: {}
        });
    } else if (body.name > 20) {
        res.json({
            code: 1,
            msg: '分类名超过20个字符',
            data: {}
        });
    }
    try {
        const categoryId = getUuid();
        body.categoryId = categoryId;
        const result = await Category.insertCategory(body);
        if (result.insertId) {
            return res.json({
                code: 0,
                data: {},
                msg: '添加category成功'
            });
        }
        return res.json({
            code: 1,
            data: {},
            msg: '添加category失败'
        });
    } catch (err) {
        next(err);
    }
});

router.get('/exportExcel', async (req, res, next) => {
    try {
        const posts = await Post.getPosts();

        const conf = {};
        conf.cols = [{
            caption: 'id',
            type: 'number',
            width: 30
        }, {
            caption: 'title',
            type: 'string',
            width: 30
        }, {
            caption: 'abstract',
            type: 'string',
            width: 30
        }, {
            caption: 'content',
            type: 'string',
            width: 30
        }, {
            caption: 'ctime',
            type: 'string',
            width: 130
        }, {
            caption: 'mtime',
            type: 'string',
            width: 130
        }, {
            caption: 'uname',
            type: 'string',
            width: 30
        }, {
            caption: 'uid',
            type: 'string',
            width: 30
        }, {
            caption: 'categoryName',
            type: 'string',
            width: 30
        }, {
            caption: 'status',
            type: 'string',
            width: 30
        }];
        conf.rows = posts.map(item => {
            const status = item.status === 0 ? '禁用' : '启用';
            return [item.id, item.title, item.abstract, item.content, formatTime(item.ctime), formatTime(item.mtime),
                item.uname, item.uid, item.categoryName, status
            ];
        });
        try {
            const result = nodeExcel.execute(conf);
            res.setHeader('Content-Type', 'application/vnd.openxmlformats');
            const nowTime = Date.now();
            res.setHeader("Content-Disposition", "attachment; filename=" + `posts${formatTime(nowTime)}.xlsx`);
            res.end(result, 'binary');
        } catch (err) {
            next(err);
        }
    } catch (err) {
        next(err);
    }
});

const formatTime = (time) => {
    if (time === '0') {
        return '';
    }
    return moment(Number(time)).format('YYYY-MM-DD HH:mm:ss');
};

const changeCategoryStatus = (id, status) => {
    return Category.setCategoryStatus(id, status);
};

const changeUserStatus = (uid, status) => {
    return User.setUserStatus(uid, status);
};

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

const checkPost = (data) => {
    const title = data.title;
    const titleResult = checkItem(title, 20, '标题');
    if (!titleResult.isValid) {
        return titleResult;
    }
    const abstract = data.abstract;
    const abstractResult = checkItem(abstract, 50, '摘要');
    if (!abstractResult.isValid) {
        return abstractResult;
    }
    const content = data.content;
    if (!content) {
        return {
            isValid: false,
            code: 1,
            msg: `请输入内容`
        };
    }
    const category = data.category;
    if (!category) {
        return {
            isValid: false,
            code: 1,
            msg: `请选择分类`
        };
    }

    return {
        isValid: true,
        code: 0,
        msg: `全部校验通过`
    }
};

const checkItem = (field, length, fileName) => {
    if (!field) {
        return {
            isValid: false,
            code: 1,
            msg: `请输入${fileName}`
        };
    } else if (field.length > length) {
        return {
            isValid: false,
            code: 1,
            msg: `${fileName}过长`
        };
    }
    return {
        isValid: true,
        code: 0,
        msg: ''
    };
};

module.exports = {
    init:function (app) {
        app.use('/api/admin', requireLogin, router);
    }
};

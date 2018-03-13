const Router = require('express').Router;
const Post = require('../../models/post');

const router = new Router();

router.get('/posts', async (req, res) => {
    try {
        const page = req.query.page - 1 || 0;
        const limit = req.query.limit || 5;
        const posts = await Post.getPosts(page * limit, Number(limit));
        const totalRes = await Post.getPostsTotal();
        res.send({
            code: 0,
            msg: '查询成功',
            data: {
                posts,
                total: totalRes[0].total
            }
        });
    } catch (e) {
        res.send({
            code: 1,
            msg: '查询错误'
        });
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

router.get('/like', async (req, res, next) => {
    const id = req.query.id;
    if (!id) {
        res.json({
            code: 1,
            msg: '缺少id',
            data: []
        });
    }
    try {
        const result = await Post.likePost(id);
        if (result.affectedRows > 0) {
            await res.json({
                code: 0,
                msg: '点赞成功',
                data: {}
            });
            return;
        }
        await res.json({
            code: 1,
            msg: '找不到post',
            data: {}
        });
    } catch (err) {
        next(err);
    }
});

module.exports = {
    init:function (app) {
        app.use('/blog', router);
    }
};

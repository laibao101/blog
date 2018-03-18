const {getConnection} = require("./db");

const getPostsSql = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.id where posts.status = 1 LIMIT ?,?`;
const getPosts = (page, limit) => {
    const connect = getConnection();
    return connect.query(getPostsSql, [page, limit]);
};

const insertPostSql = `INSERT INTO posts (posts.title,posts.abstract,posts.content,posts.author,posts.ctime,posts.category,posts.status) values(?,?,?,?,?,?,?)`;
const insertPost = (data) => {
    const connect = getConnection();
    return connect.query(insertPostSql, [data.title, data.abstract, data.content, data.author, data.ctime, data.category, data.status]);
};

const getPostSql = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.id WHERE posts.id = ?`;
const getPost = (id) => {
    const connect = getConnection();
    return connect.query(getPostSql, [id]);
};

const updatePostSql = `update posts set posts.title = ?,posts.abstract = ?,posts.content = ?,posts.mtime = ?,posts.category =? where posts.id = ?`;
const updatePost = (data) => {
    const connect = getConnection();
    return connect.query(updatePostSql, [data.title, data.abstract, data.content, data.mtime, data.category, data.id]);
};

const deletePostSql = `update posts set posts.status = 0 where posts.id = ?`;
const deletePost = (id) => {
    const connect = getConnection();
    return connect.query(deletePostSql, [id]);
};

const getPostsTotalSql = `SELECT COUNT(1) as total from posts WHERE posts.status = 1`;
const getPostsTotal = () => {
    const connect = getConnection();
    return connect.query(getPostsTotalSql, []);
};

const likePostSql = `UPDATE posts SET posts.like = posts.like + 1 where posts.id = ?`;
const likePost = (id) => {
    const connect = getConnection();
    return connect.query(likePostSql, [id]);
};

module.exports = {
    getPosts,
    insertPost,
    likePost,
    getPost,
    updatePost,
    deletePost,
    getPostsTotal
};

const Client = require("mysql-pro");
const config = require("./config").mysql;
let pool = null;

const getConnection = () => {
    if (!pool) {
        pool = new Client({
            mysql: config
        });

    }
    return pool;
};

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


const insertUserSql = `insert into user (uid,uname,nickname,password) values(?,?,?,?)`;
const insertUser = (data) => {
    const connect = getConnection();
    return connect.query(insertUserSql, [data.uid, data.uname, data.nickname, data.password]);
};

const getUsersSql = `select id,uid,uname,nickname,status from user`;
const getUsers = () => {
    const connect = getConnection();
    return connect.query(getUsersSql, []);
};

const getPostSql = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.categoryId WHERE posts.id = ?`;
const getPost = (id) => {
    const connect = getConnection();
    return connect.query(getPostSql, [id]);
};

const setUserStatusSql = `update user set status = ? where user.uid = ?`;
const setUserStatus = (uid, status) => {
    const connect = getConnection();
    return connect.query(setUserStatusSql, [status, uid]);
};

const getCategoriesSql = `select * from category`;
const getCategories = () => {
    const connect = getConnection();
    return connect.query(getCategoriesSql, []);
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

const setCategoryStatusSql = `update category set status = ? where id = ?`;
const setCategoryStatus = (id, status) => {
    const connect = getConnection();
    return connect.query(setCategoryStatusSql, [status, id]);
};

const insertCategorySql = `insert into category (categoryId,name,status) values(?,?,?)`;
const insertCategory = (data) => {
    const connect = getConnection();
    return connect.query(insertCategorySql, [data.categoryId, data.name, data.status]);
};

const likePostSql = `UPDATE posts SET posts.like = posts.like + 1 where posts.id = ?`;
const likePost = (id) => {
    const connect = getConnection();
    return connect.query(likePostSql, [id]);
};

const getUserSql = `select uid,uname,nickname,password from user where user.uname = ?`;
const getUser = (uname) => {
    const connect = getConnection();
    return connect.query(getUserSql, [uname]);
};

const getUserByUidSql = `select uid,uname,nickname,password from user where user.uid = ?`;
const getUserByUid = (uid) => {
    const connect = getConnection();
    return connect.query(getUserByUidSql, [uid]);
};

const getPostsTotalSql = `SELECT COUNT(1) as total from posts WHERE posts.status = 1`;
const getPostsTotal = () => {
    const connect = getConnection();
    return connect.query(getPostsTotalSql, []);
};

const getCategoriesTotalSql = `SELECT COUNT(1) as total from category`;
const getCategoriesTotal = () => {
    const connect = getConnection();
    return connect.query(getCategoriesTotalSql, []);
};

module.exports = {
    getPosts,
    insertPost,
    insertUser,
    getUsers,
    getPost,
    setUserStatus,
    getCategories,
    updatePost,
    deletePost,
    setCategoryStatus,
    insertCategory,
    likePost,
    getUser,
    getPostsTotal,
    getCategoriesTotal,
    getUserByUid
};

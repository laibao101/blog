const {getConnection} = require("./db");

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


const setUserStatusSql = `update user set status = ? where user.uid = ?`;
const setUserStatus = (uid, status) => {
    const connect = getConnection();
    return connect.query(setUserStatusSql, [status, uid]);
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

module.exports = {
    insertUser,
    getUsers,
    setUserStatus,
    getUser,
    getUserByUid
};

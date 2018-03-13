const {getConnection} = require("./db");

const getCategoriesSql = `select * from category`;
const getCategories = () => {
    const connect = getConnection();
    return connect.query(getCategoriesSql, []);
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

const getCategoriesTotalSql = `SELECT COUNT(1) as total from category`;
const getCategoriesTotal = () => {
    const connect = getConnection();
    return connect.query(getCategoriesTotalSql, []);
};

module.exports = {
    getCategories,
    setCategoryStatus,
    insertCategory,
    getCategoriesTotal
};

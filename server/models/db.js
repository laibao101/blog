const Client = require("mysql-pro");
const dbConfig = require("../config/dbConfig");
let pool = null;

const getConnection = () => {
    if (!pool) {
        pool = new Client({
            mysql: dbConfig.mysql
        });
    }
    return pool;
};

module.exports = {
    getConnection
};

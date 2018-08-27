import * as Client from 'mysql-pro';
import dbConfig from '../config/dbConfig'
let pool = null;

export const getConnection = () => {
    if (!pool) {
        pool = new Client({
            mysql: dbConfig.mysql,
        });
    }
    return pool;
};

export default getConnection;


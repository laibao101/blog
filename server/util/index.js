const md5 = require('md5');
const uuidv4 = require('uuid/v4');
const md5WithSalt = (str) => md5(`${str}-blog`);

const getUuid = () => uuidv4();

module.exports = {
    md5WithSalt,
    getUuid
};

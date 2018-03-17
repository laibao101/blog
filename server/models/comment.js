const {getConnection} = require("./db");

const addCommentSql = `INSERT INTO comments (comments.content, comments.posId) VALUES(?, ?)`;
const addComment  = (data) => {
    const connect = getConnection();
    return connect.query(addCommentSql, [data.comment, data.id]);
};

module.exports = {
    addComment
};

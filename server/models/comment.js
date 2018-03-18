const {getConnection} = require("./db");

const addCommentSql = `INSERT INTO comments (comments.content, comments.postId, comments.time) VALUES(?, ?, ?)`;
const addComment  = (data) => {
    const connect = getConnection();
    return connect.query(addCommentSql, [data.comment, data.id, data.time]);
};

const countByPostIdSql = `
SELECT
	count(1) AS total
FROM
	comments
WHERE
	comments.postId = ?
`;
const countByPostId = (id) => {
    const connect = getConnection();
    return connect.query(countByPostIdSql, [id]);
};

const getCommentsByIdSql = `
SELECT
	comments.content, comments.time
FROM
	comments
WHERE
	comments.postId = ?
ORDER BY time + 0 DESC
`;
const getCommentsById = (id) => {
    const connect = getConnection();
    return connect.query(getCommentsByIdSql, [id]);
};

module.exports = {
    addComment,
    countByPostId,
    getCommentsById
};

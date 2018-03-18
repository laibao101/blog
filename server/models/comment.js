const {getConnection} = require("./db");

const addCommentSql = `INSERT INTO comments (comments.content, comments.postId) VALUES(?, ?)`;
const addComment  = (data) => {
    const connect = getConnection();
    return connect.query(addCommentSql, [data.comment, data.id]);
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

module.exports = {
    addComment,
    countByPostId
};

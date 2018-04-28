import { getConnection } from './db';
import IComment from './../interface/IComment';

interface IInsert {
    affectedRows: number;
}

interface ICommentTotal {
    total: number;
}
export default class CommentModel {
    private _addCommentSql: string = `INSERT INTO comments (comments.content, comments.postId, comments.time) VALUES(?, ?, ?)`;
    private _countByPostIdSql: string = `SELECT count(1) AS total FROM comments WHERE comments.postId = ? `;
    private _getCommentsByIdSql: string = `  SELECT   comments.content, comments.time  FROM   comments  WHERE comments.postId = ? ORDER BY time + 0 DESC `;
    public addComment(data: IComment): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._addCommentSql, [data.content, data.id, data.time]);
    }

    public countByPostId(id: number): Promise<ICommentTotal> {
        const connect = getConnection();
        return connect.query(this._countByPostIdSql, [id]);
    }

    public getCommentsById(id: number): Promise<IComment[]> {
        const connect = getConnection();
        return connect.query(this._getCommentsByIdSql, [id]);
    }
}

import {getConnection} from './db';
import IPost from '../interface/IPost';

interface IPostTotal {
    total: number;
}

interface IInsert {
    affectedRows: number;
}

export default class PostModel {
    private _getPostsSql: string = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.id where posts.status = 1 LIMIT ?,?`;
    private _insertPostSql: string = `INSERT INTO posts (posts.title,posts.abstract,posts.content,posts.author,posts.ctime,posts.category,posts.status) values(?,?,?,?,?,?,?)`;
    private _getPostSql: string = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.id WHERE posts.id = ?`;
    private _updatePostSql : string= `update posts set posts.title = ?,posts.abstract = ?,posts.content = ?,posts.mtime = ?,posts.category =? where posts.id = ?`;
    private _deletePostSql: string = `update posts set posts.status = 0 where posts.id = ?`;
    private _getPostsTotalSql: string = `SELECT COUNT(1) as total from posts WHERE posts.status = 1`;
    private _likePostSql: string = `UPDATE posts SET posts.like = posts.like + 1 where posts.id = ?`;
    private _getAllPostsSql:string = `SELECT posts.*, user.uid, user.uname, user.nickname,category.name as categoryName, category.categoryId  from posts INNER JOIN user on posts.author = user.uid INNER JOIN category ON posts.category = category.id where posts.status = 1`;
    public getPosts(page: number, limit: number):Promise<IPost[]> {
        const connect = getConnection();
        return connect.query(this._getPostsSql, [page, limit]);
    }

    public insertPost(data: IPost):Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._insertPostSql, [data.title, data.abstract, data.content, data.author, data.ctime, data.category, data.status]);
    }

    public getPost(id: number):Promise<IPost> {
        const connect = getConnection();
        return connect.query(this._getPostSql, [id]);
    }

    public updatePost(data: IPost): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._updatePostSql, [data.title, data.abstract, data.content, data.mtime, data.category, data.id]);
    }

    public deletePost(id: number): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._deletePostSql, [id]);
    }

    public getPostsTotal(): Promise<IPostTotal[]> {
        const connect = getConnection();
        return connect.query(this._getPostsTotalSql, []);
    }

    public likePost(id: number): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._likePostSql, [id]);
    }

    public getAllPosts():Promise<IPost[]> {
        const connect = getConnection();
        return connect.query(this._getAllPostsSql, []);
    }
}

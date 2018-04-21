import { getConnection } from './db';
import IUser from './../interface/IUser';

interface IUserTotal {
    total: number;
}

interface IInsert {
    affectedRows: number;
}

export default class UserModel {
    private _insertUserSql: string = `insert into user (uid,uname,nickname,password) values(?,?,?,?)`;
    private _getUsersSql: string = `select id,uid,uname,nickname,status from user`;
    private _setUserStatusSql: string = `update user set status = ? where user.uid = ?`;
    private _getUserSql: string = `select uid,uname,nickname,password,avatar from user where user.uname = ?`;
    private _getUserByUidSql: string = `select uid,uname,nickname,password from user where user.uid = ?`;
    private _getUserByNameSql: string = `select count(1) as total from user where user.uname = ?`;
    private _setUserAvatarSql: string = `update user set user.avatar = ? where uid = ?`;
    public insertUser(data: IUser): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._insertUserSql, [data.uid, data.uname, data.nickname, data.password]);
    }

    public getUsers(): Promise<IUser[]> {
        const connect = getConnection();
        return connect.query(this._getUsersSql, []);
    }

    public setUserStatus(uid: string, status: number): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._setUserStatusSql, []);
    }

    public async getUser(uname: string): Promise<IUser> {
        const connect = getConnection();
        const userArr = await connect.query(this._getUserSql, [uname]);
        return userArr[0];
    }

    public async getUserByUid(uid: string): Promise<IUser> {
        const connect = getConnection();
        const users = await connect.query(this._getUserByUidSql, [uid]);
        return users[0];
    }

    public getUserByName(uname: string): Promise<IUser> {
        const connect = getConnection();
        return connect.query(this._getUserByNameSql, [uname]);
    }

    public setUserAvatar(avatar: string, uid: string): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._setUserAvatarSql, [avatar, uid]);
    }
}

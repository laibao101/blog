import {getConnection} from './db';
import ICategory from './../interface/ICategory';

interface IInsert {
    affectedRows: number;
}

interface ICategoryTotal {
    total: number;
}

export default class CategoryModel {
    private _getCategoriesSql: string = `select * from category`;
    private _insertCategorySql: string = `insert into category (categoryId,name) values(?,?)`;
    private _getCategoriesTotalSql: string = `SELECT COUNT(1) as total from category`;
    private _setCategoryStatusSql:string = `update category set status = ? where id = ?`;

    public getCategories(page: number, limit: number): Promise<ICategory[]> {
        const connect = getConnection();
        return connect.query(this._getCategoriesSql, [page, limit]);
    }

    public insertCategory(data: ICategory): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._insertCategorySql, [data.categoryId, data.name]);
    }

    public getCategoriesTotal(): Promise<ICategoryTotal> {
        const connect = getConnection();
        return connect.query(this._getCategoriesTotalSql, []);
    }

    public setCategoryStatus(id:number, status: number): Promise<IInsert> {
        const connect = getConnection();
        return connect.query(this._setCategoryStatusSql, [status, id]);
    }
}

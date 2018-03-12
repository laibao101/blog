import React from "react";
import {Table, Modal, notification} from "antd";
import Http from "../../util/Http";

export default class User extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: []
        };
        this.columns = [
            {
                title: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '用户名',
                dataIndex: 'uname',
            },
            {
                title: '昵称',
                dataIndex: 'nickname'
            },
            {
                title: '状态',
                dataIndex: 'status',
                render: (text) => {
                    return text === 0 ? '禁用' : '启用';
                }
            },
            {
                title: '操作',
                render: (text, record) => {
                    return this._genOperations(text, record);
                }
            }
        ];
        this._changeStatus = this._changeStatus.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _changeStatus(record) {
        Modal.confirm({
            title: `${record.status === 0 ? '启用' : '禁用'}`,
            content: `确定${record.status === 0 ? '启用' : '禁用'}吗?`,
            onOk: async () => {
                const res = await this._changeUserStatus(record.uid, record.status);
                if(res.code === 0) {
                    notification.success({
                        message: '操作结果',
                        description: res.msg
                    });
                    this._updateList();
                }
            },
        });
    }

    async _updateList() {
        try {
            const res = await this._fetchList();
                this.setState({
                    list: res.data
                });
        }catch (err){
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _fetchList() {
        return Http.get('/api/admin/users');
    }

    _changeUserStatus(uid, status) {
        try {
            let url = '';
            if(status === 0) {
                url = '/api/admin/enableUser';
            }else{
                url = '/api/admin/disableUser';
            }

            return Http.get(url, {uid});
        }catch (err){
            notification.error({
                message: '请求错误',
                description: err.reason
            });
            return err;
        }
    }

    _genOperations(text, record) {
        return <a onClick={()=> this._changeStatus(record)}>{record.status === 0 ? '启用' : '禁用'}</a>;
    }

    render() {
        const {list} = this.state;
        return (
                <div>
                    <Table
                        columns={this.columns}
                        dataSource={list}
                        bordered
                        pagination={false}
                        rowKey={record => record.id}
                    />
                </div>
        )
    }
}

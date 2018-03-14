import React from "react";
import {Table, Modal, notification} from "antd";
import {connect} from "react-redux";
import {disableUser, enableUser, getTableList} from "../../action/user";

class User extends React.PureComponent {
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
            onOk: () => {
                this._changeUserStatus(record)
                    .catch(err => notification.error({
                        message: '请求错误',
                        description: err.reason
                    }));
            },
        });
    }

    _updateList() {
        try {
            this.props.getTableList();
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }


    async _changeUserStatus(record) {
        try {
            let res = null;
            if (record.status === 0) {
                res = await this.props.enableUser({uid: record.uid});
            } else {
                res = await this.props.disableUser({uid: record.uid});
            }
            notification.success({
                message: '操作结果',
                description: res.msg
            });
            this._updateList();
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _genOperations(text, record) {
        return <a onClick={() => this._changeStatus(record)}>{record.status === 0 ? '启用' : '禁用'}</a>;
    }

    render() {
        const {list = [], loading = false} = this.props;
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={list}
                    bordered
                    pagination={false}
                    loading={loading}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

export default connect(
    state => state.user,
    {getTableList, enableUser, disableUser}
)(User);

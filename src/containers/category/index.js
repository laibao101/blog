import React from "react";
import {Table, Modal, Button} from "antd";
import {notification} from "antd/lib/index";
import Http from "../../util/Http";
import EditorView from "./EditorView";

export default class Category extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            showEditor: false,
            id: 0,
            total: 0,
            current: 1
        };
        this.limit = 5;
        this.columns = [
            {
                title: '分类名',
                dataIndex: 'name',
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
        this._editorOk = this._editorOk.bind(this);
        this._addNewCategory = this._addNewCategory.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _changeStatus(record) {
        Modal.confirm({
            title: `${record.status === 0 ? '启用' : '禁用'}`,
            content: `确定${record.status === 0 ? '启用' : '禁用'}吗?`,
            onOk: async () => {
                try {
                    const res = await this._changeCategoryStatus(record.id, record.status);
                    if (res.code === 0) {
                        notification.success({
                            message: '操作结果',
                            description: res.msg
                        });
                        this._updateList();
                    }
                } catch (err) {
                    notification.error({
                        message: '请求错误',
                        description: err.reason
                    });
                }
            },
        });
    }

    _changeCategoryStatus(id, status) {
        try {
            let url = '';
            if (status === 0) {
                url = '/api/admin/enableCategory';
            } else {
                url = '/api/admin/disableCategory';
            }

            return Http.get(url, {id});
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
            return err;
        }
    }

    async _updateList() {
        try {
            const res = await this._fetchList();
            if (res.code === 0) {
                this.setState({
                    list: res.data.categories,
                    total: res.data.total
                });
            }
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _fetchList() {
        return Http.get('/api/admin/categories', {page: this.state.current, limit: this.limit});
    }

    _genOperations(text, record) {
        return <a onClick={() => this._changeStatus(record)}>{record.status === 0 ? '启用' : '禁用'}</a>;
    }

    _editorOk(success) {
        this.setState({
            showEditor: ''
        });
        if (success) {
            this._updateList();
        }
    }

    _addNewCategory() {
        this.setState({
            showEditor: 'add'
        });
    }

    _paginateChange(current) {
        this.setState({
            current,
        }, () => {
            this._updateList();
        });
    }

    render() {
        const {list} = this.state;
        const pagination = {
            pageSize: 5,
            showQuickJumper: true,
            current: this.state.current,
            total: this.state.total,
            onChange: this._paginateChange
        };
        return (
            <div>
                {
                    (this.state.showEditor === 'add' || this.state.showEditor === 'edit') ?
                        <EditorView
                            mode={this.state.showEditor}
                            id={this.state.id}
                            onOk={this._editorOk}
                        /> : null
                }
                <div style={{marginBottom: '10px'}}>
                    <Button
                        type="primary"
                        icon="plus-circle-o"
                        onClick={this._addNewCategory}
                    >新增</Button>
                </div>
                <Table
                    columns={this.columns}
                    dataSource={list}
                    bordered
                    pagination={pagination}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

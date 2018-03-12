import React from "react";
import {Button, Table, notification, Divider, Modal} from "antd";
import moment from "moment";
import EditorView from "./EditorView";
import Http from "../../util/Http";

export default class Admin extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            showEditor: '',
            id: 0,
            list: [],
            total: 0,
            current: 1
        };
        this.limit = 5;
        this.columns = [
            {
                title: '标题',
                dataIndex: 'title',
            },
            {
                title: '作者',
                dataIndex: 'uname',
            },
            {
                title: '创建时间',
                dataIndex: 'ctime',
                render: (text) => {
                    return this._formatTime(text);
                }
            },
            {
                title: '修改时间',
                dataIndex: 'mtime',
                render: (text) => {
                    return this._formatTime(text);
                }
            },
            {
                title: '评论数',
                dataIndex: 'comment',
            },
            {
                title: '赞数',
                dataIndex: 'like',
            },
            {
                title: '操作',
                render: (text, record) => {
                    return this._genOperations(text, record);
                }
            }
        ];
        this._addNewPost = this._addNewPost.bind(this);
        this._editorOk = this._editorOk.bind(this);
        this._paginateChange = this._paginateChange.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{moment(Number(time)).format('YYYY-MM-DD HH:mm:ss')}</span>;
    }

    _genOperations(text, record) {
        const btnText = {
            1: '编辑',
            2: '删除',
            3: '查看'
        };
        const arr = [];
        Object.keys(btnText).forEach((key, index) => {
            if (index === 0) {
                arr.push(
                    <span
                        key={key}
                    >
                        <a
                            onClick={() => this._operate(key, record)}
                        >
                            {btnText[key]}
                        </a>
                    </span>
                )
            } else {
                arr.push(
                    <span
                        key={key}
                    >
                        <Divider type="vertical"/>
                        <a
                            onClick={() => this._operate(key, record)}
                        >
                            {btnText[key]}
                        </a>
                    </span>
                )
            }
        });
        return arr;
    }

    _operate(operateType, record) {
        switch (operateType) {
            case '1':
                this._edit(record.id);
                break;
            case '2':
                this._del(record.id);
                break;
            case '3':
                this._preview(record.id);
                break;
            default:
                break;
        }
    }


    _edit(id) {
        this.setState({
            showEditor: 'edit',
            id
        });
    }

    _del(id) {
        Modal.confirm({
            title: '删除',
            content: '确定删除吗?',
            onOk: async () => {
                try {
                    const res = await this._deletePost(id);
                    if (res.code === 0) {
                        await this._updateList();
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

    _preview(id) {
        this.props.history.push(`/detail/${id}`);
    }

    _deletePost(id) {
        try {
            return Http.get('/api/admin/delPost', {id});
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
            return err;
        }
    }

    async _updateList() {
        let data = [];
        try {
            const res = await Http.get('/api/admin/posts', {page: this.state.current, limit: this.limit});
            if (res.code === 0) {
                data = res.data;
                this.setState({
                    list: data.posts,
                    total: data.total
                });
            }
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
        return data;
    }

    _addNewPost() {
        this.setState({
            showEditor: 'add'
        });
    }

    _editorOk(success) {
        this.setState({
            showEditor: ''
        });
        if (success) {
            this._updateList();
        }
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
                        onClick={this._addNewPost}
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

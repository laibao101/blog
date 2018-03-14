import React from "react";
import {Button, Table, notification, Divider, Modal} from "antd";
import {connect} from 'react-redux';
import EditorView from "./EditorView";
import {getTableList, deletePost} from '../../action/admin';
import {QueryString, Time} from "../../util";
import moment from "moment/moment";

class Admin extends React.PureComponent {
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
        this._paginateChange = this._paginateChange.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{Time.formatTime(time)}</span>;
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
                    const res = await this.props.deletePost({id});
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
        window.open(`#/detail/${id}`)
    }

    _updateList(nextPage = this._getPage()) {
        this._getList(nextPage)
            .catch(err => notification.error({
                message: '请求错误',
                description: err.reason
            }));
    }

    async _getList(nextPage) {
        try {
            await this.props.getTableList({page: nextPage, limit: this.limit});
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _changeEditorStatus(status, sign) {
        this.setState({
            showEditor: status
        }, () => {
            if (sign) {
                this._updateList();
            }
        });
    }

    async _paginateChange(nextPage) {
        const page = this._getPage();
        // 如果点击的是相同页，不做操作
        if (nextPage === page) {
            return;
        }
        // 翻页后刷新列表
        await this._updateList(nextPage);
        await this.props.history.push({
            pathname: '/admin/post',
            search: `?page=${nextPage}`
        });
    }

    _getPage() {
        return parseInt(QueryString.getQueryString(this.props.location.search.substring(1)).page, 10) || 1;
    }

    render() {
        const {list = [], total = 0, loading = false} = this.props;
        const page = this._getPage();
        const pagination = {
            pageSize: 5,
            showQuickJumper: true,
            current: page,
            total: total,
            onChange: this._paginateChange
        };
        return (
            <div>
                {
                    (this.state.showEditor === 'add' || this.state.showEditor === 'edit') ?
                        <EditorView
                            mode={this.state.showEditor}
                            id={this.state.id}
                            onOk={(sign) => {
                                this._changeEditorStatus('', sign);
                            }}
                        /> : null
                }
                <div style={{marginBottom: '10px'}}>
                    <Button
                        type="primary"
                        icon="plus-circle-o"
                        onClick={() => {
                            this._changeEditorStatus('add');
                        }}
                    >新增</Button>
                </div>
                <Table
                    columns={this.columns}
                    dataSource={list}
                    bordered
                    loading={loading}
                    pagination={pagination}
                    rowKey={record => record.id}
                />
            </div>
        )
    }
}

export default connect(
    state => state.admin.admin,
    {getTableList, deletePost}
)(Admin)

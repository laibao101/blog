import React from "react";
import {Table, Modal, Button, notification} from "antd";
import {connect} from "react-redux";
import EditorView from "./EditorView";
import {getCategories} from "../../action/category";
import {QueryString} from "../../util";
import {enableCategory, disableCategory} from '../../service/category';

class Category extends React.PureComponent {
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
        this._paginateChange = this._paginateChange.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _changeStatus(record) {
        Modal.confirm({
            title: `${record.status === 0 ? '启用' : '禁用'}`,
            content: `确定${record.status === 0 ? '启用' : '禁用'}吗?`,
            onOk: async () => {
                this._changeCategoryStatus(record);
            },
        });
    }

    _showError(err) {
        notification.error({
            description: err.reason
        });
    }

    _showSuccess(res) {
        this._updateList();
        notification.success({
            description: res.msg,
        });
    }

    _changeCategoryStatus(record) {
        if (record.status === 0) {
            enableCategory({id: record.id})
                .subscribe(
                    (res) => {
                        this._showSuccess(res);
                    },
                    (error) => {
                        this._showError(error);
                    },
                );
        } else {
            disableCategory({id: record.id})
                .subscribe(
                    (res) => {
                        this._showSuccess(res);
                    },
                    (error) => {
                        this._showError(error);
                    },
                );
        }
    }

    _updateList(nextPage = this._getPage()) {
        this.props.getCategories({page: nextPage, limit: this.limit});
    }

    _genOperations(text, record) {
        return <a onClick={() => this._changeStatus(record)}>{record.status === 0 ? '启用' : '禁用'}</a>;
    }

    _paginateChange(nextPage) {
        const page = this._getPage();
        // 如果点击的是相同页，不做操作
        if (nextPage === page) {
            return;
        }
        // 翻页后刷新列表
        this._updateList(nextPage);
        this.props.history.push({
            pathname: '/admin/category',
            search: `?page=${nextPage}`
        });
    }

    _getPage() {
        return parseInt(QueryString.getQueryString(this.props.location.search.substring(1)).page, 10) || 1;
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
    state => state.category.category,
    {getCategories}
)(Category)

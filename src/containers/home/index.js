import React from "react";
import {Card, Icon, List, Pagination, notification, Spin, Tooltip} from "antd";
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {comment, getTableList, like} from '../../action/home';
import {Time, QueryString} from "../../util";
import CommentView from "./CommentView";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
        this.limit = 5;
        this._paginateChange = this._paginateChange.bind(this);
        this._submitComment = this._submitComment.bind(this);
    }

    componentWillMount() {
        const page = this._getPage();
        this._updateList(page)
            .catch(err => notification.error({
                message: '请求错误',
                description: err.reason
            }));
    }

    /**
     * 翻页回调
     * @param nextPage 下一页页数
     * @private
     */
    async _paginateChange(nextPage) {
        const page = this._getPage();
        // 如果点击的是相同页，不做操作
        if (nextPage === page) {
            return;
        }
        // 翻页后刷新列表
        await this._updateList(nextPage);
        await this.props.history.push({
            pathname: '/',
            search: `?page=${nextPage}`
        });
    }

    /**
     * 格式化时间
     * @param time 时间字符串
     * @returns {object | string} ReactElement | 空字符串
     * @private
     */
    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{Time.formatTime(time)}</span>;
    }

    /**
     * 点赞
     * @param id 文章id
     * @returns {Promise<void>}
     * @private
     */
    async _addLike(id) {
        try {
            const res = await this.props.like({id});
            if (res.code === 0) {
                notification.success({
                    message: '点赞成功',
                    description: res.msg
                });
                await this._updateList();
            }
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    /**
     * 更新列表
     * @param page 当前页数
     * @private
     */
    async _updateList(page = this._getPage()) {
        await this.props.getTableList({
            page,
            limit: this.limit
        });
    }

    /**
     * 获取当前页数
     * @returns {number} 当前页数
     * @private
     */
    _getPage() {
        return parseInt(QueryString.getQueryString(this.props.location.search.substring(1)).page, 10) || 1;
    }

    _submitComment(comment, id) {
        this.props.comment({
            comment,
            id,
        })
            .then(async res => {
                notification.success({
                    message: '评论成功',
                    description: res.msg,
                });
                await this._updateList();
            })
            .catch(err => notification.error({
                message: '请求错误',
                description: err.reason,
            }));
    }

    render() {
        const page = this._getPage();
        const {list = [], loading = false, total = 0} = this.props;
        return (
            <div>
                {
                    loading ? (
                        <div
                            style={{
                                position: 'absolute',
                                width: '100%',
                                height: '100%',
                                zIndex: 9999,
                                top: '50%',
                                left: '48%'
                            }}
                        >
                            <Spin tip="加载中..."/>
                        </div>
                    ) : null
                }
                <List grid={
                    {gutter: 16, column: 1}}
                      dataSource={list}
                      renderItem={
                          item => (
                              <List.Item>
                                  <Card key={item.id}
                                        extra={<Link to={`/detail/${item.id}`}>查看全文</Link>}
                                        title={
                                            <span>
                                                <span>
                                                    <Icon type="info-circle"/>
                                                    {item.title}
                                                    </span>
                                                <span className="ctime"
                                                      style={{fontSize: '14px', marginLeft: 30, color: 'gray'}}>
                                                    <Icon
                                                        type="calendar"/> 创建时间: {this._formatTime(item.ctime)}</span>
                                            </span>
                                        }
                                        actions={
                                            [
                                                <div>
                                                    <Icon type="book"/> 分类:{item.categoryName}
                                                </div>,
                                                <CommentView
                                                    onSubmit={(content) => {
                                                        this._submitComment(content, item.id)
                                                    }}
                                                    count={item.comment}
                                                />,
                                                <Tooltip
                                                    arrowPointAtCenter
                                                    title="老铁，点个赞咯"
                                                >
                                                    <div
                                                        onClick={() => this._addLike(item.id)}
                                                    >
                                                        <Icon
                                                            type="like"
                                                        />
                                                        {item.like}
                                                    </div>
                                                </Tooltip>
                                            ]
                                        }
                                        loading={!item.abstract}>
                                      {item.abstract}
                                  </Card>
                              </List.Item>
                          )
                      }>
                </List>
                {
                    total < 1 ? null : (
                        <Pagination
                            showQuickJumper
                            current={page}
                            total={total}
                            pageSize={5}
                            onChange={this._paginateChange}
                        />
                    )
                }
            </div>
        );
    }
}

export default connect(
    state => state.home,
    {getTableList, like, comment}
)(withRouter(Home));

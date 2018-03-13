import React from "react";
import {Card, Icon, List, Pagination, notification, Spin, Tooltip} from "antd";
import {connect} from 'react-redux';
import {Link, withRouter} from "react-router-dom";
import {getTableList, like} from '../../action/home';
import {Time, QueryString} from "../../util";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
        };
        this.limit = 5;
        this._paginateChange = this._paginateChange.bind(this);
    }

    componentWillMount() {
        const page = this._getPage();
        this._updateList(page);
    }

    _paginateChange(nextPage) {
        const page = this._getPage();
        if(nextPage === page){
            return;
        }
        this.props.history.push({
            pathname: '/',
            search: `?page=${nextPage}`
        });
        this._updateList(nextPage);
    }

    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{Time.formatTime(time)}</span>;
    }

    async _addLike(id) {
        try {
            const res = await this.props.like({id});
            if (res.code === 0) {
                notification.success({
                    message: '点赞成功',
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
    }

    _updateList(page = 1) {
        this.props.getTableList({
            page,
            limit: this.limit
        });
    }

    _getPage() {
        return parseInt(QueryString.getQueryString(this.props.location.search.substring(1)).page) || 1;
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
                                                <div><Icon type="edit"/> 评论</div>,
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
    {getTableList, like}
)(withRouter(Home));

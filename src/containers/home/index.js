import React from "react";
import {Card, Icon, List, Pagination, notification} from "antd";
import moment from "moment";
import Http from "../../util/Http";
import {Link, withRouter} from "react-router-dom";

class Home extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            current: 1,
            total: 0,
            list: []
        };
        this.limit = 5;
        this._paginateChange = this._paginateChange.bind(this);
    }

    componentWillMount() {
        this._updateList();
    }

    _paginateChange(current) {
        this.setState({
            current,
        }, () => {
            this._updateList();
        });
    }

    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{moment(Number(time)).format('YYYY-MM-DD HH:mm:ss')}</span>;
    }

    async _addLike(id) {
        try {
            const res = await this._submitLike({id});
            console.log(res);
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

    async _updateList() {
        try {
            const res = await Http.get(`/blog/posts`, {page: this.state.current, limit: this.limit});
            if (res.code === 0) {
                this.setState({
                    list: res.data.posts,
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

    _submitLike(data) {
        return Http.get('/blog/like', data);
    }

    render() {
        const {list} = this.state;
        return (
            <div>
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
                                                    {item.title}</span>
                                                <span className="ctime" style={{fontSize:'14px',marginLeft:30,color:'gray'}}>
                                                    <Icon
                                                    type="calendar"/> 创建时间: {this._formatTime(item.ctime)}</span>
                                            </span>
                                        }
                                        actions={
                                            [
                                                <div><Icon type="book"/> 分类:{item.categoryName}</div>,
                                                <div><Icon type="edit"/> 评论</div>,
                                                <div
                                                    onClick={() => this._addLike(item.id)}
                                                >
                                                    <Icon
                                                        type="like"
                                                    />
                                                    {item.like}
                                                </div>
                                            ]
                                        }
                                        loading={!item.abstract}>
                                      {item.abstract}
                                  </Card>
                              </List.Item>
                          )
                      }>
                    {this.state.loading ? '加载中。。。' : ''}
                </List>
                <Pagination
                    showQuickJumper
                    current={this.state.current}
                    total={this.state.total}
                    pageSize={5}
                    onChange={this._paginateChange}
                />
            </div>
        );
    }
}

export default withRouter(Home);

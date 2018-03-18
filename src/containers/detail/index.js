import React from "react";
import {Card,notification} from "antd";
import moment from "moment/moment";
import Http from "../../util/Http";
import {Link} from "react-router-dom";

export default class Detail extends React.Component{
    constructor(){
        super();
        this.state = {
            post:{}
        };
    }
    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{moment(Number(time)).format('YYYY-MM-DD HH:mm:ss')}</span>;
    }
    componentWillMount(){
        const {id} = this.props.match.params;
        this._getDetailData(id);
    }

    async _getDetailData(id) {
        try {
            const res = await Http.get(`/blog/post?id=${id}`);
            this.setState({
                post: res.data.post
            });
        }catch (err){
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }
    render() {
        const {post} = this.state;
        return (
            <div>
                <Card
                    title="文章详情"
                    extra={<Link to={`/`}>返回首页</Link>}
                >
                    <Card
                        type="inner"
                        title={<h2>标题</h2>}
                    >
                        {post.title}
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={<h2>发布时间</h2>}
                    >
                        {this._formatTime(post.ctime)}
                    </Card>
                    <Card
                        style={{ marginTop: 16 }}
                        type="inner"
                        title={<h2>内容</h2>}
                    >
                        <p dangerouslySetInnerHTML={{ __html: post.content}} />
                    </Card>
                </Card>
            </div>
        )
    }
}

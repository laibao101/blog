import React from "react";
import {Card, notification} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import CommentsView from "./CommentsView";
import ReplyView from "./ReplyView";
import {getDetailData} from "../../action/detail";
import {Time, Marked} from "../../util";
import {homeService} from '../../service';

class Detail extends React.Component {
    constructor() {
        super();
        this.state = {
            post: {}
        };
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _formatTime(time) {
        if (time === '0') {
            return '';
        }
        return <span>{Time.formatTime(time)}</span>;
    }

    componentWillMount() {
        this._getDetail();
    }

    _getDetail() {
        const id = this._getId();
        if(id) {
            this.props.getDetailData({id})
        }
    }

    _getId() {
        return this.props.match.params.id;
    }

    _handleSubmit(comment) {
        homeService.comment({
            comment,
            id: this._getId(),
        })
            .subscribe(
                (res) => {
                    notification.success({
                        description: res.msg,
                    });
                    this._getDetail();
                },
                (error) => {
                    notification.error({
                        description: error.reason,
                    });
                },
            );
    }

    render() {
        const {post = {}, comments = []} = this.props;
        const id = this._getId();
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
                        style={{marginTop: 16}}
                        type="inner"
                        title={<h2>发布时间</h2>}
                    >
                        {this._formatTime(post.ctime)}
                    </Card>
                    <Card
                        style={{marginTop: 16}}
                        type="inner"
                        title={<h2>内容</h2>}
                    >
                        <p dangerouslySetInnerHTML={{__html: Marked.renderToHtml(post.content)}}/>
                    </Card>
                </Card>
                <CommentsView
                    comments={comments}
                />
                <ReplyView
                    id={id}
                    onSubmit={this._handleSubmit}
                />
            </div>
        )
    }
}

export default connect(
    state => state.detail,
    {getDetailData}
)(Detail)

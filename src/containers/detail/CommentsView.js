import React from "react";
import {Card, List} from "antd";
import Time from "../../util/Time";

export default class CommentsView extends React.PureComponent {
    render() {
        const {comments} = this.props;
        return (
            <Card
                style={{
                    marginTop: 10,
                }}
                title={<h2>最新评论</h2>}
            >
                <List
                    bordered
                    dataSource={comments}
                    renderItem={item => {
                        return (
                            <List.Item>
                                <span
                                    style={{
                                        float: 'left',
                                        flex: 1,
                                    }}
                                >{item.content}</span>
                                <span
                                    style={{
                                        float: 'right',
                                        paddingRight: 10,
                                    }}
                                >评论时间:</span>
                                <span
                                    style={{
                                        float: 'right',
                                        color: 'gray',
                                    }}
                                >{Time.formatTime(item.time)}</span>
                            </List.Item>
                        )
                    }}
                />
            </Card>
        );
    }
}

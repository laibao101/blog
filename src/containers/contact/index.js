import React from "react";
import {List} from "antd";

const data = [
    {
        title: 'QQ',
        desc: '369632567'
    },
    {
        title: '昵称',
        desc: '赖宝'
    }
];

export default class Contact extends React.PureComponent{
    render() {
        return (
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a>{item.title}</a>}
                            description={item.desc}
                        />
                    </List.Item>
                )}
            />
        );
    }
}

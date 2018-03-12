import React from 'react';
import {Icon, Layout} from "antd";

const {Footer} = Layout;

export default class GlobalFooter extends React.PureComponent {
    render() {
        return (
            <Footer style={{textAlign: 'center'}}>
                laibao ©2018 powerd by React <Icon type="github"/>
            </Footer>
        );
    }
}

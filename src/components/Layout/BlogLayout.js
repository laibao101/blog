import React from "react";
import {Icon, LocaleProvider, Menu} from 'antd';
import {Layout} from "antd/lib/index";
import GlobalFooter from "../GlobalFooter";
import zhCN from 'antd/lib/locale-provider/zh_CN';

const {Header, Content} = Layout;
export default class BlogLayout extends React.PureComponent {
    _menuChange = ({key}) => {
        this.props.history.push(key);
    };
    render() {
        const {pathname} = this.props.location;
        const {children} = this.props;
        return (
            <div>
                <Header style={{position: 'fixed', top: '0', left: '0', width: '100%', zIndex: 10, minWidth: 1140}}>
                    <div className="blog-logo"/>
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[pathname]}
                        style={{lineHeight: '64px', float: 'left'}}
                        onClick={this._menuChange}
                    >
                        <Menu.Item key='/'>
                            <Icon type="home" />
                            主页
                        </Menu.Item>
                        <Menu.Item key='/about'>
                            <Icon type="info-circle-o" />
                            关于
                        </Menu.Item>
                        <Menu.Item key='/contact'>
                            <Icon type="solution" />
                            联系
                        </Menu.Item>
                        <Menu.Item key='/login'>
                            <Icon type="rocket" />
                            登录
                        </Menu.Item>
                    </Menu>
                </Header>
                <LocaleProvider locale={zhCN}>
                    <Content
                        style={{
                            width: 1140,
                            padding: '100px 50px 64px',
                            margin: '0 auto',
                            minHeight: `calc(100vh - 69px)`
                        }}>
                        {children}
                    </Content>
                </LocaleProvider>
                <GlobalFooter/>
            </div>
        );
    }
}

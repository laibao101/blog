import React from "react";
import {Layout, Menu, Icon, LocaleProvider, Breadcrumb, Dropdown, Badge, Avatar} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import GlobalFooter from "../GlobalFooter";
import {connect} from "react-redux";
import {logout} from "../../action/app";

const {Header, Sider, Content} = Layout;

class AdminLayout extends React.PureComponent {
    state = {
        collapsed: false,
    };
    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };
    onCollapse = (collapsed) => {
        this.setState({collapsed});
    };
    _menuChange = ({key}) => {
        this.props.history.push(key)
    };

    _genBreadcrumb = () => {
        const pathname = this.props.location.pathname;
        const arr = pathname.split('/');
        return arr.map(item => <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>)
    };

    _handleLogout = ({key}) => {
        if (key === 'logout') {
            this.props.logout();
        }
    };

    componentWillMount() {
        this._checkLogin();
    }

    componentWillReceiveProps() {
        this._checkLogin();
    }

    _checkLogin() {
        const pathname = this.props.location.pathname;
        if (!this.props.isLogin) {
            this.props.history.push(`/login?backUrl=${pathname}`);
        }
    }

    render() {
        const menu = (
            <Menu
                selectedKeys={[]}
                onClick={this._handleLogout}
            >
                <Menu.Item key="logout"><Icon type="logout"/>退出登录</Menu.Item>
            </Menu>
        );
        return (
            <div>
                <Layout style={{minHeight: '100vh'}}>
                    <Sider
                        collapsible
                        collapsed={this.state.collapsed}
                        onCollapse={this.onCollapse}
                    >
                        <div className="logo">
                            {
                                this.state.collapsed ?
                                    <div>logo</div> : <span>后台管理系统</span>
                            }
                        </div>
                        <Menu
                            theme="dark"
                            defaultSelectedKeys={[this.props.location.pathname]}
                            mode="inline"
                            onClick={this._menuChange}
                        >
                            <Menu.Item key="/admin/post">
                                <Icon type="pie-chart"/>
                                <span>POST</span>
                            </Menu.Item>
                            <Menu.Item key="/admin/user">
                                <Icon type="user"/>
                                <span>USER</span>
                            </Menu.Item>
                            <Menu.Item key="/admin/category">
                                <Icon type="desktop"/>
                                <span>CATEGORY</span>
                            </Menu.Item>
                            <Menu.Item key="/admin/exportExcel">
                                <Icon type="export"/>
                                <span>EXPORT</span>
                            </Menu.Item>
                        </Menu>
                    </Sider>
                    <Layout>
                        <Header style={{background: '#fff', padding: 0}}>
                            <Icon
                                className="trigger"
                                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                onClick={this.toggle}
                            />
                            <div
                                style={{
                                    display: 'inline-block',
                                    float: 'right',
                                }}
                            >
                                <span style={{marginRight: 24}}>
                                    <Dropdown overlay={menu} placement="bottomLeft">
                                      <Badge dot>
                                          <Avatar
                                              shape="square"
                                              icon="user"
                                              size="large"
                                          >
                                              {this.props.userInfo.nickname}
                                          </Avatar>
                                      </Badge>
                                    </Dropdown>
                                </span>
                            </div>
                        </Header>
                        <Content style={{margin: '0 16px'}}>
                            <Breadcrumb style={{margin: '16px 0'}}>
                                {this._genBreadcrumb()}
                            </Breadcrumb>
                            <div style={{padding: 24, background: '#fff', minHeight: 360, height: '100%'}}>
                                <LocaleProvider locale={zhCN}>
                                    {this.props.children}
                                </LocaleProvider>
                            </div>
                        </Content>
                        <GlobalFooter/>
                    </Layout>
                </Layout>
            </div>
        );
    }
}

export default connect(
    state => state.app,
    {logout}
)(AdminLayout);

import React from 'react';
import {withRouter} from 'react-router-dom';
import RouterConfig from "../routerConfig";
import AdminLayout from "../components/Layout/AdminLayout";
import BlogLayout from "../components/Layout/BlogLayout";

class App extends React.Component {
    render() {
        const isAdmin = this.props.location.pathname.startsWith('/admin');
        const isLogin = this.props.location.pathname.startsWith('/login');
        if (isAdmin) {
            return (
                <AdminLayout  {...this.props}>
                    <RouterConfig/>
                </AdminLayout>
            );
        }
        if (isLogin) {
            return (
                <RouterConfig/>
            );
        }
        return (
            <BlogLayout {...this.props}>
                <RouterConfig/>
            </BlogLayout>
        );
    }
}

export default withRouter(App);

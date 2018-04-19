import React from "react";
import {Route,Switch} from 'react-router-dom';
import Home from '../containers/home/index';
import Detail from '../containers/detail/index';
import About from "../containers/about/index";
import Contact from "../containers/contact/index";
import Login from '../containers/login/index';
import Admin from "../containers/admin/index";
import User from "../containers/user/index";
import Category from "../containers/category/index";
import ExportExcel from "../containers/exportExcel/index";
import Register from "../containers/register/index";

export default () => (
    <div>
        <Switch>
            <Route path="/" component={Home} key="/" exact />,
            <Route path="/detail/:id" component={Detail} exact key="/detail"/>,
            <Route path="/about" component={About}  key="/about"/>,
            <Route path="/contact" component={Contact}  key="/contact"/>,
            <Route path="/login" component={Login}  key="/login"/>,
            <Route path="/register" component={Register}  key="/register"/>,
            <Route path="/admin/post" component={Admin}  key="/admin/post"/>,
            <Route path="/admin/user" component={User}  key="/admin/user"/>,
            <Route path="/admin/category" component={Category}  key="/admin/category"/>,
            <Route path="/admin/exportExcel" component={ExportExcel}  key="/admin/exportExcel"/>,
        </Switch>
    </div>
);

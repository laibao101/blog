import React from "react";
import {Route} from 'react-router-dom';
import Home from './containers/home';
import Detail from './containers/detail';
import About from "./containers/about";
import Contact from "./containers/contact";
import Login from './containers/login';
import Admin from "./containers/admin";
import User from "./containers/user";
import Category from "./containers/category";
import ExportExcel from "./containers/exportExcel";
import Register from "./containers/register";

export default () => [
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
];

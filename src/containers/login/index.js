import React from 'react';
import {Layout, Form, Input, Icon, Button, notification} from 'antd';
import {connect} from 'react-redux';
import {Params} from "../../util";
import {login} from '../../action/login'

const {Content} = Layout;
const FormItem = Form.Item;

class Login extends React.PureComponent {
    constructor() {
        super();
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
        const data = this._getFormData();
        if (!data) {
            return;
        }
        this._submitDataToServer(data)
            .catch(err => notification.error({
                message: '请求错误',
                description: err.reason
            }));
    }

    async _submitDataToServer(data) {
        try {
            const res = await this.props.login(data);
            if (res.code === 0) {
                this.props.history.push('/admin/post');
            }
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _getFormData() {
        let obj = {};
        this.props.form.validateFields((err, values) => {
            if (err) {
                obj = false;
            }
            obj = Params.serializeSearchData(values);
        });

        return obj;
    }


    render() {
        const {getFieldDecorator} = this.props.form;
        return (
            <Layout>
                <Content>
                    <div className="login-layout">
                        <div className="login-form" style={{maxWidth: 300, margin: '20% auto'}}>
                            <Form className="login-form" onSubmit={this._handleSubmit}>
                                <Form.Item>
                                    <h1 style={{textAlign: 'center'}}>欢迎登录</h1>
                                </Form.Item>
                                <FormItem>
                                    {getFieldDecorator('uname', {
                                        rules: [{required: true, message: '请输入用户名'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            placeholder="用户名"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator('password', {
                                        rules: [{required: true, message: '请输入密码'}],
                                    })(
                                        <Input
                                            prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
                                            type="password"
                                            placeholder="密码"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                        style={{width: '100%'}}
                                    >登录</Button>
                                    <Button
                                        type="primary"
                                        htmlType="button"
                                        className="login-form-button"
                                        style={{width: '100%'}}
                                        onClick={() => this.props.history.push('/')}
                                    >注册</Button>
                                </FormItem>
                            </Form>
                        </div>
                    </div>
                </Content>
            </Layout>
        )
    }
}


export default connect(
    state => state.login,
    {login}
)(Form.create()(Login));

import React from 'react';
import {Layout, Form, Input, Icon, Button, notification, Steps, Card, message, Upload} from 'antd';
import {connect} from 'react-redux';
import {Params} from "../../util";
import {register} from '../../action/register'

const {Content} = Layout;
const FormItem = Form.Item;
const Step = Steps.Step;

class Register extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            fileList: [],
            step: 0,
        };
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
            const res = await this.props.register(data);
            if (res.code === 0) {
                this.setState({
                    step: 1
                });
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

        if(obj && this._checkData(obj)) {
            return obj;
        }else if(obj && !this._checkData(obj)){
            message.error('两次填入的密码不一样');
        }

        return false;
    }

    _checkData(obj) {
        try {
            return obj.password === obj.passwordConfirm;
        }catch (err) {
            return false;
        }
    }

    _getCurrentStep() {
        return this.state.step;
    }

    _getFirstLayout() {
        const {getFieldDecorator} = this.props.form;
        return (
            <div>
                <Form.Item>
                    <h1 style={{textAlign: 'center'}}>欢迎登录</h1>
                </Form.Item>
                <FormItem label="用户名">
                    {getFieldDecorator('username', {
                        rules: [{required: true, message: '请输入用户名'}],
                    })(
                        <Input
                            prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                            placeholder="用户名"
                        />
                    )}
                </FormItem>
                <FormItem label="密码">
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
                <FormItem label="确认密码">
                    {getFieldDecorator('passwordConfirm', {
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
                    >下一步</Button>
                    <Button
                        type="default"
                        htmlType="button"
                        className="login-form-button"
                        style={{width: '100%'}}
                        onClick={() => this.props.history.push('/login')}
                    >已有账户,去登录</Button>
                </FormItem>
            </div>
        );
    }

    _handleChange({ fileList }) {
        this.setState({ fileList });
    }

    _getNextLayout() {
        const uploadButton = (
            <div>
                <Icon type="plus" />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <FormItem>
                <Upload
                    action="/api/imgUpload"
                    listType="picture-card"
                    fileList={this.state.fileList}
                    onChange={this._handleChange}
                >
                    {this.state.fileList.length >= 1 ? null : uploadButton}
                </Upload>
            </FormItem>
        );
    }

    render() {
        const step = this._getCurrentStep();
        const layout = step === 0 ? this._getFirstLayout() : this._getNextLayout();
        return (
            <Content>
                <Card bordered={false}>
                    <div>
                        <Steps current={step}>
                            <Step title="填写基本信息" />
                            <Step title="上传头像" />
                            <Step title="完成" />
                        </Steps>
                    </div>
                    <Form className="login-form" onSubmit={this._handleSubmit}>
                        {layout}
                    </Form>
                </Card>
            </Content>
        );
    }
}


export default connect(
    state => state.register,
    {register}
)(Form.create()(Register));

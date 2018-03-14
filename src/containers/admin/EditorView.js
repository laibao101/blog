import React from "react";
import {Form, Input, Modal, Select, notification} from "antd";
import {connect} from 'react-redux';
import {getCategories, getPostData, addPost, editPost} from '../../action/admin'
import {Params} from "../../util";

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 6},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 14},
    },
};
const Option = Select.Option;

class EditorView extends React.PureComponent {
    constructor() {
        super();
        this.state = {
            loading: false,
            options: null
        };
        this._onOk = this._onOk.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    componentWillMount() {
        this.props.getCategories()
            .catch(err => notification.error({
                message: '请求错误',
                description: err.reason
            }));
        const {mode, id} = this.props;
        if (mode === 'edit') {
            this._setForm(id)
                .catch(err => notification.error({
                    message: '请求错误',
                    description: err.reason
                }));
        }
    }

    async _setForm(id) {
        try {
            const data = await this.props.getPostData({id});
            this._setFormData(data.data.post);
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _setFormData(data) {
        this.props.form.setFieldsValue({
            title: data.title,
            abstract: data.abstract,
            content: data.content,
            category: data.category
        });
    }

    _genOptions(arr) {
        return arr.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    }

    async _onOk() {
        const data = this._getFormData();
        const {mode, id} = this.props;
        if (data) {
            if (mode === 'add') {
                this._addPost(data)
                    .catch(err => notification.error({
                        message: '请求错误',
                        description: err.reason
                    }));
            } else {
                data.id = id;
                this._editPost(data)
                    .catch(err => notification.error({
                        message: '请求错误',
                        description: err.reason
                    }));
            }
        }
    }

    async _editPost(data) {
        try {
            const res = await this.props.editPost(data);
            this.props.onOk(true);
            notification.success({
                message: '提交成功',
                description: res.msg
            });
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    async _addPost(data) {
        try {
            const res = await this.props.addPost(data);
            this.props.onOk(true);
            notification.success({
                message: '提交成功',
                description: res.msg
            });
        } catch (err) {
            notification.error({
                message: '请求错误',
                description: err.reason
            });
        }
    }

    _getFormData() {
        let obj = false;
        this.props.form.validateFields((err, values) => {
            if (err) {
                notification.error({
                    message: '表单填写',
                    description: '请正确填写表单'
                });
                return;
            }
            obj = Params.serializeSearchData(values);
        });
        return obj;
    }

    _onClose() {
        this.props.onOk(false);
    }

    render() {
        const {mode, form, options = []} = this.props;
        const {getFieldDecorator} = form;
        const categories = this._genOptions(options);
        return (
            <Modal
                title={mode === 'add' ? '新增post' : '编辑post'}
                visible
                onOk={this._onOk}
                onCancel={this._onClose}
                confirmLoading={this.state.loading}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="标题"
                    >
                        {getFieldDecorator('title', {
                            rules: [
                                {required: true, message: '请输入标题'},
                                {max: 20, message: '最多输入20个字符'}
                            ]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="摘要"
                    >
                        {getFieldDecorator('abstract', {
                            rules: [
                                {required: true, message: '请输入摘要'},
                                {max: 50, message: '最多输入50个字符'}
                            ]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="正文"
                    >
                        {getFieldDecorator('content', {
                            rules: [
                                {required: true, message: '请输入正文'}
                            ]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="分类"
                    >
                        {getFieldDecorator('category', {
                            rules: [
                                {required: true, message: '请选择分类'}
                            ]
                        })(
                            <Select
                                placeholder="请选择分类"
                            >
                                {categories}
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default connect(
    state => state.admin.editor,
    {getCategories, getPostData, addPost, editPost}
)(Form.create()(EditorView));

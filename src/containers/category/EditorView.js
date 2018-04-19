import React from "react";
import {Modal, Form, Input} from "antd";
import {notification} from "antd/lib/index";
import {Params} from "../../util";
import {connect} from "react-redux";
import {addCategory, editCategory} from "../../service/category";

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

class EditorView extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            options: null
        };
        this._onOk = this._onOk.bind(this);
        this._onClose = this._onClose.bind(this);
    }

    async _onOk() {
        const data = this._getFormData();

        if (data) {
            this._submitFormData(data);
        }
    }

    _onClose() {
        this.props.onOk(false);
    }

    _getFormData() {
        let obj = {};
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

     _submitFormData(data) {
        if (this.props.mode === 'add') {
            addCategory(data)
                .subscribe(
                    (res) => {
                        this._showSuccess(res);
                    },
                    (error) => {
                        this._showError(error);
                    },
                );
        } else {
            data.id = this.props.id;
            editCategory(data)
                .subscribe(
                    (res) => {
                        this._showSuccess(res);
                    },
                    (error) => {
                        this._showError(error);
                    },
                );
        }
    }

    _showError(err) {
        notification.error({
            description: err.reason
        });
    }

    _showSuccess(res) {
        this.props.onOk(true);
        notification.success({
            description: res.msg,
        });
    }

    render() {
        const {mode, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Modal
                title={mode === 'add' ? '新增category' : '编辑category'}
                visible
                onOk={this._onOk}
                onCancel={this._onClose}
                confirmLoading={this.state.loading}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="分类名"
                    >
                        {getFieldDecorator('name', {
                            rules: [
                                {required: true, message: '请输入分类名'},
                                {max: 20, message: '最多输入20个字符'}
                            ]
                        })(
                            <Input type="text"/>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
}

export default connect(
    state => state.category,
    {}
)(Form.create()(EditorView));

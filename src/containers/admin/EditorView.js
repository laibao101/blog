import React from "react";
import {Form, Input, Modal, Select, notification, Button, Popconfirm} from "antd";
import {connect} from 'react-redux';
import {getCategories} from '../../action/admin';
import {getPost, addPost, editPost} from '../../service/admin';
import {Params} from "../../util";
import ModalEditor from "../../components/Mceditor/ModalEditor";
import ModalMde from "../../components/SimpleMde/ModalMde";

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
            options: null,
            mode: false,
            content: '',
            mdMode: false,
        };
        this._onOk = this._onOk.bind(this);
        this._onClose = this._onClose.bind(this);
        this._editorOk = this._editorOk.bind(this);
        this._mdEditorOk = this._mdEditorOk.bind(this);
    }

    componentWillMount() {
        this.props.getCategories();
        const {mode, id} = this.props;
        if (mode === 'edit') {
            this._setForm(id);
        }
    }

    _setForm(id) {
        getPost({id})
            .subscribe(
                (data) => {
                    this._setFormData(data);
                },
                (error) => {
                    this._showError(error);
                },
            );
    }

    _setFormData(data) {
        this.props.form.setFieldsValue({
            title: data.title,
            abstract: data.abstract,
            content: data.content,
            category: data.category
        });
        // 设置富文本数据
        this.setState({
            content: data.content,
        });
    }

    _genOptions(arr) {
        return arr.map(item => <Option key={item.id} value={item.id}>{item.name}</Option>)
    }

    _onOk() {
        const data = this._getFormData();
        const {mode, id} = this.props;
        if (data) {
            if (mode === 'add') {
                this._addPost(data);
            } else {
                data.id = id;
                this._editPost(data);
            }
        }
    }

    _editPost(data) {
        editPost(data)
            .subscribe(
                (res) => {
                    this._showSuccess(res);
                },
                (error) => {
                    this._showError(error);
                },
            );
    }

    _addPost(data) {
        addPost(data)
            .subscribe(
                (res) => {
                    this._showSuccess(res);
                },
                (error) => {
                    this._showError(error);
                },
            );
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

    _onClose() {
        this.props.onOk(false);
    }

    _changeMode(status) {
        this.setState({
            mode: status,
        });
    }

    _editorOk(data) {
        this.setState({
            content: data,
            mode: false,
        });
        this.props.form.setFieldsValue({
            content: data,
        });
    }

    _changeMdMode(status) {
        this.setState({
            mdMode: status,
        });
    }

    _mdEditorOk(data) {
        this.setState({
            content: data,
            mdMode: false,
        });
        this.props.form.setFieldsValue({
            content: data,
        });
    }

    render() {
        const {mode, form, options = []} = this.props;
        const {getFieldDecorator} = form;
        const categories = this._genOptions(options);
        return (
            <div>
                {
                    this.state.mode ?
                        (
                            <ModalEditor
                                onOk={this._editorOk}
                                onClose={() => {
                                    this._changeMode(false);
                                }}
                                content={this.state.content}
                            />
                        ) : null
                }
                {
                    this.state.mdMode ?
                        (
                            <ModalMde
                                onOk={this._mdEditorOk}
                                onClose={() => {
                                    this._changeMdMode(false);
                                }}
                                value={this.state.content}
                            />
                        ) : null
                }
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
                                <div>
                                    <Popconfirm
                                        okText="markdown"
                                        cancelText="富文本"
                                        okType="default"
                                        title="请选择格式"
                                        onConfirm={() => {
                                            this._changeMdMode(true)
                                        }}
                                        onCancel={() => {
                                            this._changeMode(true);
                                        }}
                                    >
                                        <Button
                                            icon="edit"
                                        >
                                            编辑正文
                                        </Button>
                                    </Popconfirm>
                                </div>
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
            </div>
        );
    }
}

export default connect(
    state => state.admin.editor,
    {getCategories}
)(Form.create()(EditorView));

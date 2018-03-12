import React from "react";
import {Modal, Form, Input} from "antd";
import {notification} from "antd/lib/index";
import Params from "../../util/Params";
import Http from "../../util/Http";

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
			try{
				const res = await this._submitFormData(data);
				if (res.code === 0) {
					this.props.onOk(true);
					notification.success({
						message: '提交成功',
						description: res.msg
					});
				} else {
					notification.error({
						message: '请求错误',
						description: res.msg
					});
				}
			}catch (err){
				notification.error({
					message: '请求错误',
					description: err.reason
				});
			}
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
		let url = '';
		if (this.props.mode === 'add') {
			url = '/api/admin/category';
		} else {
			data.id = this.props.id;
			url = '/api/admin/editCategory';
		}
		return Http.post(url, data);
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

export default Form.create()(EditorView);
import React from "react";
import {Button, Modal} from "antd";
import SimpleMde from "./index";

export default class ModalMde extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value || '',
        };
        this._mdeChange = this._mdeChange.bind(this);
    }

    _onOK() {
        this.props.onOk(this.state.value);
        this.setState({
            value: '',
        });
    }

    _mdeChange(value) {
        this.setState({
            value,
        });
    }

    render() {
        return (
            <Modal
                width="80%"
                visible
                maskClosable={false}
                confirmLoading={false}
                wrapClassName="vertical-center-modal"
                title={'markdown内容编辑'}
                footer={[
                    <Button
                        key="back"
                        size="large"
                        onClick={() => {
                            if (!this.state.loading && this.props.onClose) {
                                this.props.onClose();
                            }
                        }}
                    >
                        取消
                    </Button>,
                    <Button
                        key="submit"
                        type="primary"
                        size="large"
                        loading={this.state.loading}
                        onClick={(evt) => {
                            this._onOK(evt);
                        }}
                    >
                        确定
                    </Button>,
                ]}
                onCancel={() => {
                    if (!this.state.loading && this.props.onClose) {
                        this.props.onClose();
                    }
                }}
            >
                <SimpleMde
                    onChange={this._mdeChange}
                    options={{
                        autofocus: true,
                        placeholder: '添加你的精彩回复',
                        spellChecker: false,
                        renderingConfig: {
                            codeSyntaxHighlighting: true,
                        }
                    }}
                    value={this.state.value}
                />
            </Modal>
        )
    }
}

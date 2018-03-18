import React from 'react';
import { Modal, Button } from 'antd';
import Mceditor from './index';

class ModalEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            editorData: '',
        };
    }

    componentWillMount() {
        this.setState({
            editorData: this.props.content,
        });
    }

    _onOK(evt) {
        evt.preventDefault();
        this.props.onOk(this.state.editorData);
    }

    /**
     * 获取富文本编辑器的数据
     * @param val 富文本编辑器的数据
     * @private
     */
    _get = (val) => {
        this.setState({
            editorData: val,
        });
    };

    render() {
        return (
            <div>
                <Modal
                    width="80%"
                    visible
                    maskClosable={false}
                    confirmLoading={false}
                    wrapClassName="vertical-center-modal"
                    title={'内容编辑'}
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
                    <div>
                        <Mceditor
                            getCon={this._get}
                            content={this.state.editorData}
                        />
                    </div>
                </Modal>
            </div>
        );
    }
}

export default ModalEditor;

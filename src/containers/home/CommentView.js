import React from "react";
import {Button, Icon, Popover} from "antd";
import SimpleMde from "../../components/SimpleMde";

export default class CommentView extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            value: '',
        };
        this._hide = this._hide.bind(this);
        this._handleVisibleChange = this._handleVisibleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this._mdeChange = this._mdeChange.bind(this);
    }

    _hide() {
        this.setState({
            visible: false,
        });
    }

    _handleVisibleChange(visible) {
        this.setState({visible});
    }

    _handleSubmit() {
        this.props.onSubmit(this.state.value);
        this.setState({
            value: '',
        });
        this._hide();
    }

    _mdeChange(value) {
        this.setState({
            value,
        });
    }

    _createCommentContent() {
        return (
            <div>
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
                <Button
                    type="primary"
                    htmlType="button"
                    onClick={this._handleSubmit}
                >确定回复</Button>
                <Button
                    type="default"
                    htmlType="button"
                    style={{
                        marginLeft: 10,
                    }}
                    onClick={this._hide}
                >取消</Button>
            </div>
        )
    }

    render() {
        const commentContent = this._createCommentContent();
        return (
            <Popover
                content={commentContent}
                title="给个评论咯,老铁"
                trigger="click"
                visible={this.state.visible}
                onVisibleChange={this._handleVisibleChange}
            >
                <Icon type="edit"/>
                评论 ( {this.props.count} )
            </Popover>
        );
    }
}

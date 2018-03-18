import React from "react";
import SimpleMde from "../../components/SimpleMde";
import {Button} from "antd";

export default class ReplyView extends React.Component {
    constructor() {
        super();
        this.state = {
            value: '',
        };
        this._handleSubmit = this._handleSubmit.bind(this);
        this._mdeChange = this._mdeChange.bind(this);
    }

    _handleSubmit() {
        this.props.onSubmit(this.state.value);
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
            <div
                style={{
                    marginTop: 10,
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
                <Button
                    type="primary"
                    htmlType="button"
                    onClick={this._handleSubmit}
                >确定回复</Button>
            </div>
        )
    }
}

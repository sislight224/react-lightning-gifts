// NPM Dependencies
import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

// UI Dependencies
import { Button, Input, Tooltip } from 'antd';
import PropTypes from 'prop-types';

const InputGroup = Input.Group;

class InputCopyButton extends Component {
    static propTypes = {
        text: PropTypes.string.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            copyText: 'Copy'
        };
    }

    render() {
        const { copyText } = this.state;
        const { text } = this.props;

        return (
            <InputGroup compact>
                <Input style={{ width: '88%' }} value={text} />
                <Tooltip
                    placement="top"
                    title={copyText}
                    onVisibleChange={((visible) => visible && this.setState({ copyText: 'Copy' }))}
                >
                    <CopyToClipboard
                        text={text}
                        onCopy={() => this.setState({ copyText: 'Copied!' })}
                    >
                        <Button style={{ width: '12%' }} icon="copy" />
                    </CopyToClipboard>
                </Tooltip>
            </InputGroup>
        );
    }
}

export default InputCopyButton;

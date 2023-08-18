// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

// UI Dependencies
import { Button, Form, Input } from 'antd';

class VerifyForm extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func.isRequired,
            validateFields: PropTypes.func.isRequired,
            setFieldsValue: PropTypes.func.isRequired
        }).isRequired,
        orderId: PropTypes.string.isRequired
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, orderId, history } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                const { verifyCode } = values;

                history.push(`/redeem/${orderId}?verifyCode=${verifyCode}`);
                window.location.reload();
            }
        });
    };

    validateVerifyCode = (rule, value, callback) => {
        if (value.toString().length !== 4) {
            callback('Please enter your 4-digit security code');
        } else {
            callback();
        }
    };

    numbersOnly = (value, prevValue = '') => {
        const reg = /^[0-9]+$/;
        if (reg.test(value) || value === '') {
            return value;
        }
        return prevValue;
    };

    render() {
        const { getFieldDecorator } = this.props.form;

        return (
            <Form
                onSubmit={this.handleSubmit}
                layout="vertical"
                hideRequiredMark
                autoComplete="off"
                style={{ textAlign: 'center' }}
            >
                <Form.Item>
                    {getFieldDecorator('verifyCode', {
                        rules: [{ validator: this.validateVerifyCode }],
                        normalize: this.numbersOnly,
                        validateTrigger: 'onBlur'
                    })(
                        <Input
                            style={{ width: '100%' }}
                            placeholder="Security code"
                            size="large"
                            maxLength={4}
                        />
                    )}
                </Form.Item>
                <Form.Item style={{ marginBottom: 0 }}>
                    <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    // redeemGift: redeemGiftSignal.request
}, dispatch);

const WrappedVerifyForm = Form.create()(VerifyForm);

export default connect(null, mapDispatchToProps)(WrappedVerifyForm);

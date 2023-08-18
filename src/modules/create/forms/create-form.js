// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter, Link } from 'react-router-dom';
import _ from 'lodash';
import QRCode from 'qrcode.react';

// UI Dependencies
import {
    Button, Form, Input, Spin, Icon
} from 'antd';

// Util Dependencies
import Emoji from 'utils/components/emoji';
import InputCopyButton from 'utils/components/input-copy-button';

// Local Dependencies
import { createInvoiceSignal } from '../actions';

class CreateForm extends Component {
    static propTypes = {
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func.isRequired,
            validateFields: PropTypes.func.isRequired
        }).isRequired,
        // history: PropTypes.object.isRequired,
        invoiceStatus: PropTypes.object.isRequired,
        createInvoice: PropTypes.func.isRequired,
        toggleModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            loading: false
        };
    }

    componentDidUpdate = (prevProps) => {
        const { invoiceStatus } = this.props;

        if (invoiceStatus !== prevProps.invoiceStatus) {
            this.setState({
                loading: false
            });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const { form, createInvoice } = this.props;

        form.validateFields((err, values) => {
            if (!err) {
                const { amount, senderName, senderMessage } = values;
                const forceNumber = Number(amount);
                createInvoice({ amount: forceNumber, senderName, senderMessage });
                this.setState({
                    loading: true
                });
            }
        });
    };

    validateAmount = (rule, value, callback) => {
        if (value < 100) {
            callback('Gifts must over 100 sats');
        } else if (value % 1 !== 0) {
            callback('Decimals not supported');
        } else if (value > 100000) {
            callback('Only gifts under 100,001 sats supported');
        } else {
            callback();
        }
    };

    validateSenderMessage = (rule, value, callback) => {
        if (value && value.length > 100) {
            callback('Your message must be under 100 characters.');
        } else {
            callback();
        }
    };

    validateSenderName = (rule, value, callback) => {
        if (value && value.length > 15) {
            callback('Recipient name must be under 15 characters.');
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
        const { loading } = this.state;
        const { invoiceStatus, toggleModal } = this.props;
        const { getFieldDecorator } = this.props.form;

        if (loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spin tip="loading..." size="large" />
                </div>
            );
        }

        if (!_.isEmpty(invoiceStatus)) {
            const {
                lightningInvoice, status, orderId
            } = invoiceStatus;

            if (status === 'paid') {
                return (
                    <>
                        <p style={{ marginBottom: 20 }}>
                            <Emoji label="confeti" symbol="🎊️" /> <b>Payment received!</b> <Emoji label="confeti" symbol="🎊️" />
                        </p>
                        <p style={{ marginBottom: 20 }}>
                            <Link to={`redeem/${orderId}`}>View your redeemable Bitcoin gift</Link>
                        </p>
                        <p style={{ marginBottom: 20 }}>
                            <Button type="link" onClick={() => toggleModal()}>
                                <Icon type="qrcode" />
                                Display shareable QR code
                            </Button>
                        </p>
                        <InputCopyButton text={`${window.location.href}redeem/${orderId}`} />
                    </>
                );
            }

            return (
                <>
                    <p>Pay invoice with a Lightning compatible wallet to complete your gift card</p>
                    <a href={`lightning:${lightningInvoice.payreq}`}>
                        <QRCode
                            value={lightningInvoice.payreq}
                            size={128}
                            style={{ marginBottom: 12 }}
                            renderAs="svg"
                        />
                    </a>
                    <InputCopyButton text={lightningInvoice.payreq} />
                </>
            );
        }

        return (
            <>
                <Form
                    onSubmit={this.handleSubmit}
                    layout="vertical"
                    hideRequiredMark
                    style={{ textAlign: 'center' }}
                    autoComplete="off"
                >
                    <Form.Item>
                        {getFieldDecorator('amount', {
                            rules: [{ validator: this.validateAmount }],
                            normalize: this.numbersOnly,
                            validateTrigger: 'onBlur'
                        })(
                            <Input
                                style={{ width: '100%' }}
                                placeholder="Gift amount (satoshi)"
                                size="large"
                                addonAfter="sats"
                                min={1}
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('senderName', {
                            rules: [{ validator: this.validateSenderName }]
                        })(
                            <Input
                                style={{ width: '100%' }}
                                placeholder="Sender name (optional)"
                                size="large"
                            />
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('senderMessage', {
                            rules: [{ validator: this.validateSenderMessage }]
                        })(
                            <Input.TextArea
                                style={{ width: '100%' }}
                                placeholder="Message to recipient (optional)"
                                size="large"
                                autoSize={{ minRows: 2, maxRows: 5 }}
                            />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit">
                            Create
                        </Button>
                    </Form.Item>
                </Form>
                <small>A Lightning invoice will be generated</small>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        invoiceStatus: state.create.invoiceStatus
    };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
    createInvoice: createInvoiceSignal.request
}, dispatch);


const WrappedCreateForm = Form.create()(CreateForm);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WrappedCreateForm));

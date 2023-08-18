// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

// UI Dependencies
import { Button, Form, Input } from 'antd';

// Local Dependencies
import { redeemGiftSignal } from '../actions';

class RedeemForm extends Component {
    static propTypes = {
        form: PropTypes.shape({
            getFieldDecorator: PropTypes.func.isRequired,
            validateFields: PropTypes.func.isRequired
        }).isRequired,
        redeemGift: PropTypes.func.isRequired,
        giftDetails: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        toggleLoading: PropTypes.func.isRequired
    };

    static defaultProps = {
        giftDetails: null
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const {
            form, redeemGift, giftDetails, toggleLoading
        } = this.props;
        const { orderId, verifyCode = null } = giftDetails;

        form.validateFields((err, values) => {
            if (!err) {
                const { invoice } = values;

                redeemGift({ invoice, orderId, verifyCode });
                toggleLoading(true);
            }
        });
    };

    validateInvoice = (rule, value, callback) => {
        const { amount } = this.props.giftDetails;
        const decodedAmount = _.endsWith(amount.toString(), '00') ? `${(amount / 100)}u` : amount;

        if (!_.startsWith(value, `lnbc${decodedAmount}`)) {
            callback(`Only a ${amount} sat Lightning invoice accepted`);
        } else {
            callback();
        }
    };

    render() {
        const { getFieldDecorator } = this.props.form;

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
                        {getFieldDecorator('invoice', {
                            rules: [{ validator: this.validateInvoice }]
                        })(
                            <Input
                                style={{ width: '100%' }}
                                placeholder="lnbc..."
                                size="large"
                            />
                        )}
                    </Form.Item>
                    <Form.Item style={{ marginBottom: 0 }}>
                        <Button type="primary" size="large" style={{ width: '100%' }} htmlType="submit">
                            Receive gift
                        </Button>
                    </Form.Item>
                </Form>
            </>
        );
    }
}

const mapDispatchToProps = (dispatch) => bindActionCreators({
    redeemGift: redeemGiftSignal.request
}, dispatch);

const WrappedRedeemForm = Form.create()(RedeemForm);

export default connect(null, mapDispatchToProps)(WrappedRedeemForm);

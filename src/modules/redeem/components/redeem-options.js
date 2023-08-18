// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import _ from 'lodash';

// UI Dependencies
import {
    Row, Col, Button, Icon, Spin, Alert, Typography
} from 'antd';

// Util Dependencies
import Emoji from 'utils/components/emoji';

// Local Dependencies
import RedeemForm from '../forms/redeem-form';

const { Paragraph } = Typography;

class RedeemOptions extends Component {
    static propTypes = {
        giftDetails: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
    };

    static defaultProps = {
        giftDetails: null
    };

    constructor(props) {
        super(props);

        this.state = {
            showInvoiceHelp: false,
            showLnurlHelp: false,
            loading: false
        };
    }

    componentDidUpdate = (prevProps) => {
        const { giftDetails } = this.props;

        if (!_.isEqual(giftDetails, prevProps.giftDetails)) {
            this.setState({
                loading: false
            });
        }
    };

    toggleLoading = (loading) => this.setState({ loading });

    render() {
        const { giftDetails } = this.props;
        const { showInvoiceHelp, showLnurlHelp, loading } = this.state;

        if (giftDetails.spent === 'pending' || loading) {
            return (
                <div style={{ textAlign: 'center' }}>
                    <Spin tip="Processing gift withdrawal..." size="large" />
                </div>
            );
        }

        if (giftDetails.spent && giftDetails.spent !== 'pending') {
            return (
                <div style={{ textAlign: 'center' }}>
                    <span className="avenir darker" style={{ fontSize: 28 }}>
                        Your gift has been
                        <br />
                        redeemed!
                        <br />
                        <Emoji label="confeti" symbol="🎉" />
                    </span>
                </div>
            );
        }

        return (
            <>
                <Row type="flex" justify="center">
                    <Col xs={24} sm={11}>
                        <div className="redeemPage__col redeemPage__col--left">
                            <div className="redeemPage__colContent" style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: 10 }}>
                                    <b>1.</b>  Scan or click QR code with an LNURL-compatible wallet
                                </p>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => this.setState({ showLnurlHelp: !showLnurlHelp })}
                                    style={{ marginBottom: 6 }}
                                >
                                    <small>
                                        Which wallets are LNURL-compatible?&nbsp;
                                        {showLnurlHelp ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
                                    </small>
                                </Button>
                                {showLnurlHelp
                                    && (
                                        <div style={{ marginBottom: 14 }}>
                                            <small>
                                                <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://lightning-wallet.com/">Bitcoin Lightning Wallet</a> (Android)</div>
                                                <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://bluewallet.io/">BlueWallet</a> (iOS & Android)</div>
                                                <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://walletofsatoshi.com/">Wallet of Satoshi</a> (iOS & Android)</div>
                                                <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://breez.technology/">Breez wallet</a> (iOS & Android)</div>
                                                <div style={{ marginBottom: 4 }}><a rel="noopener noreferrer" target="_blank" href="https://zap.jackmallers.com/">Zap wallet</a> (iOS & Android & desktop)</div>
                                            </small>
                                        </div>
                                    )}
                                <a href={`lightning:${giftDetails.lnurl}`}>
                                    <QRCode
                                        value={giftDetails.lnurl}
                                        size={128}
                                        renderAs="svg"
                                    />
                                </a>
                                <small>
                                    <Paragraph copyable={{ text: `lightning:${giftDetails.lnurl}` }}>
                                        Copy to clipboard
                                    </Paragraph>
                                </small>
                            </div>
                        </div>
                    </Col>
                    <Col xs={24} sm={2}>
                        <Row type="flex" align="middle" justify="center" style={{ height: '100%' }}>
                            <h3 style={{ height: 30, margin: '16px 0' }}>OR</h3>
                        </Row>
                    </Col>
                    <Col xs={24} sm={11}>
                        <div className="redeemPage__col redeemPage__col--right">
                            <div className="redeemPage__colContent" style={{ textAlign: 'center' }}>
                                <p style={{ marginBottom: 10 }}>
                                    <b>2.</b> Create a <b>{giftDetails.amount} sat</b> Lightning invoice, and paste below <Emoji label="point-down" symbol="👇️" />
                                </p>
                                <Button
                                    type="link"
                                    size="small"
                                    onClick={() => this.setState({ showInvoiceHelp: !showInvoiceHelp })}
                                    style={{ marginBottom: 6 }}
                                >
                                    <small>
                                        How do I create a Lightning invoice?&nbsp;
                                        {showInvoiceHelp ? <Icon type="caret-up" /> : <Icon type="caret-down" />}
                                    </small>
                                </Button>
                                {showInvoiceHelp
                                    && (
                                        <p>
                                            <small>
                                            You can create a Lightning invoice using&nbsp;
                                                <a rel="noopener noreferrer" target="_blank" href="https://bluewallet.io/">Bluewallet</a>,&nbsp;
                                                <a rel="noopener noreferrer" target="_blank" href="https://zap.jackmallers.com/">Zap wallet</a>, or any other Lightning compatible wallets.
                                            </small>
                                        </p>
                                    )}
                                <RedeemForm
                                    giftDetails={giftDetails}
                                    toggleLoading={this.toggleLoading}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
                {_.get(giftDetails, 'withdrawalInfo.error')
                    && (
                        <Row type="flex" justify="center">
                            <Col xs={24} sm={12} style={{ textAlign: 'center', marginTop: 24 }}>
                                <Alert
                                    message={(
                                        <div>
                                            <small>
                                            It looks like your node did not have enough inbound capacity to receive this gift.
                                            </small>
                                            <br />
                                            <small>
                                            To increase your inbound capacity you can use&nbsp;
                                                <a rel="noopener noreferrer" target="_blank" href="https://www.bitrefill.com/buy/lightning-channel/">Bitrefill</a>
                                            </small>
                                        </div>
                                    )}
                                    type="warning"
                                    showIcon
                                />
                            </Col>
                        </Row>
                    )}
            </>
        );
    }
}

export default connect()(RedeemOptions);

// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import ReactGA from 'react-ga';

// UI Dependencies
import { Row, Col, Modal } from 'antd';

// Util Dependencies
import Emoji from 'utils/components/emoji';

// Local Dependencies
import CreateBox from '../components/create-box';

class LandingPage extends Component {
    static propTypes = {
        invoiceStatus: PropTypes.object.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            showModal: false
        };
    }

    componentDidMount = () => {
        ReactGA.pageview('/', null, 'Home Page');
    };

    toggleModal = () => {
        const { showModal } = this.state;

        this.setState({
            showModal: !showModal
        });
    };

    render() {
        const { showModal } = this.state;
        const { invoiceStatus } = this.props;

        return (
            <Row type="flex" align="middle" className="contentSection">
                <Col xs={24} sm={{ span: 12 }}>
                    <div className="home-text" style={{ marginBottom: 30 }}>
                        <h1 style={{ marginBottom: 20 }} className="avenir banner-text">
                            Bitcoin gifts, minus the fees
                        </h1>
                        <p style={{ marginBottom: 10, fontSize: 24 }}>
                            Create fee-less Bitcoin gift vouchers to share with friends, family, and your haters.
                        </p>
                        <p>
                            Powered by Lightning Network <Emoji label="lighting" symbol="⚡️" />
                        </p>
                    </div>
                </Col>
                <Col xs={24} sm={{ span: 8, offset: 4 }}>
                    <h2 className="callout-text" style={{ marginBottom: 20, textAlign: 'center' }}>
                        Create a Bitcoin gift in 30 seconds <Emoji label="point-down" symbol="👇️" />
                    </h2>
                    <CreateBox
                        toggleModal={this.toggleModal}
                    />
                </Col>
                <Modal
                    title="Shareable QR code of your gift"
                    visible={showModal}
                    onCancel={this.toggleModal}
                    footer={null}
                    maskClosable={false}
                >
                    <div style={{ textAlign: 'center' }}>
                        <QRCode
                            value={`${window.location.href}/redeem/${invoiceStatus.orderId}?lightning=${invoiceStatus.lnurl}`}
                            size={256}
                            style={{ marginBottom: 24 }}
                        />
                    </div>
                </Modal>
            </Row>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        invoiceStatus: state.create.invoiceStatus
    };
};

export default connect(mapStateToProps)(LandingPage);

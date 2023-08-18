// NPM Dependencies
import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactGA from 'react-ga';

// UI Dependencies
import { Layout, Row, Col } from 'antd';

// Public Dependencies
// eslint-disable-next-line import/extensions
import logo from 'public/logo250.png';

// Local Dependencies
import './core.styles.scss';
import RouterMap from './router';

const { APP_VERSION, NODE_ENV } = process.env;
const { Header, Content, Footer } = Layout;

if (NODE_ENV === 'production') {
    ReactGA.initialize('G-VL62E8N06K', { titleCase: false });
    ReactGA.set({ appName: 'LightningGifts', appVersion: APP_VERSION });
}

const App = () => (
    <Layout className="layout">
        <Header>
            <Row>
                <Col span={13}>
                    <img
                        src={logo}
                        alt="Lightning Gifts logo"
                        style={{ width: 32 }}
                    />
                    <span className="logo-text avenir" style={{ marginLeft: 5 }}>
                        Lightning Gifts
                    </span>
                </Col>
                <Col span={11} style={{ textAlign: 'right' }}>
                    <span><small>v{APP_VERSION}</small></span>
                </Col>
            </Row>
        </Header>
        <Content>
            <Router>
                <RouterMap />
            </Router>
        </Content>
        <Footer>
            <Row type="flex" justify="end">
                <Col span={24} style={{ textAlign: 'right' }}>
                    <span style={{ marginRight: 16 }}>
                        <small>
                            <a href="https://forms.gle/q3ikxYtRXGrUFZ9a8" target="_blank" rel="noopener noreferrer">
                                Help
                            </a>
                        </small>
                    </span>
                    <span style={{ marginRight: 16 }}>
                        <small>
                            <a href="https://docs.lightning.gifts" target="_blank" rel="noopener noreferrer">
                                API
                            </a>
                        </small>
                    </span>
                    <span>
                        <small>
                            by&nbsp;
                            <a href="https://twitter.com/bootstrapbandit" target="_blank" rel="noopener noreferrer">
                                @BootstrapBandit
                            </a>
                            <br/>
                            Powered by 
                            <a href="https://lnpay.co" target="_blank">
                                LNPay.co
                            </a>
                        </small>
                    </span>
                </Col>
            </Row>
        </Footer>
    </Layout>
);

export default connect()(App);

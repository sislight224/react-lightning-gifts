// NPM Dependencies
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// UI Dependencies
import { Card, Col, Row } from 'antd';

// Local Dependencies
import CreateForm from '../forms/create-form';
import LnurlPayTab from './lnurl-pay-tab';

class CreateBox extends Component {
    static propTypes = {
        toggleModal: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'basic'
        };
    }

    onTabChange = (key) => {
        this.setState({ activeTab: key });
    };

    render() {
        const { activeTab } = this.state;
        const { toggleModal } = this.props;

        let tabContent = null;
        switch (activeTab) {
            case 'basic':
                tabContent = <CreateForm toggleModal={toggleModal} />;
                break;
            case 'lnurl':
                tabContent = <LnurlPayTab />;
                break;
            default:
                break;
        }

        return (
            <Card
                className="create-box"
                style={{ width: '100%' }}
                tabList={[{ key: 'basic', tab: 'Basic' }, { key: 'lnurl', tab: 'LNURL' }]}
                activeTabKey={activeTab}
                onTabChange={(key) => this.onTabChange(key)}
            >
                <Row type="flex" align="middle" style={{ height: '100%', minHeight: 200 }}>
                    <Col span={24} style={{ textAlign: 'center' }}>
                        {tabContent}
                    </Col>
                </Row>
            </Card>
        );
    }
}

export default CreateBox;

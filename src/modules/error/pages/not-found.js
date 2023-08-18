// NPM Dependencies
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// UI Dependencies
import { Row, Col } from 'antd';
import ReactGA from 'react-ga';

class NotFoundPage extends Component {
    componentDidMount = () => {
        ReactGA.pageview('/not-found', null, 'Not Found Page');
    };

    render() {
        return (
            <Row type="flex" justify="center" align="middle">
                <Col>
                    Whoops, page not found <br />
                    <Link to="/">Go to the home page.</Link>
                </Col>
            </Row>
        );
    }
}

export default NotFoundPage;

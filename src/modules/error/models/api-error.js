// NPM Dependencies
import _ from 'lodash';

class ApiError extends Error {
    constructor(error) {
        super(error);
        const { response, config } = error;

        this.code = _.get(response, 'data.error.code',
            _.get(response, 'data.status',
                _.get(response, 'status', 0)));
        this.message = _.get(response, 'data.error.message',
            _.get(response, 'data.message',
                _.get(response, 'message', 0)));
        this.endpoint = _.get(config, 'url');
        this.config = error.config;
    }
}

export default ApiError;

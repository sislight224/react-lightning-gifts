// NPM Dependencies
import axios from 'axios';

// const API_HOST = 'https://node-satoshi-crate.glitch.me/';

export const apiClient = axios.create({
    // baseURL: API_HOST,
    timeout: 5000,
    responseType: 'json',
    responseEncoding: 'utf8'
});

// export const setAuthToken = (token) => {
//     httpClient.defaults.headers.common = { Authorization: `Bearer ${token}` };
// };

// export const errorResponseHandler = (error) => {
//     // handle error from error instance
//     if (_.get(error.config, 'errorHandle') === false) {
//         return Promise.reject(error);
//     }
//
//     // default error handler
//     return Promise.reject(error);
// };

// apply interceptor on response
// httpClient.interceptors.response.use(
//     response => response.data,
//     errorResponseHandler
// );

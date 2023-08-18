// NPM Dependencies
import axios from 'axios';

// Util Dependencies
import { SERVER_URL } from 'utils/constants';

export const getGiftDetails = ({ orderId, verifyCode = null }) => axios.get(`${SERVER_URL}/gift/${orderId}${verifyCode ? `?verifyCode=${verifyCode}` : ''}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));


export const redeemGift = ({ orderId, invoice, verifyCode = null }) => axios.post(`${SERVER_URL}/redeem/${orderId}`, { invoice, verifyCode })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

// export const getRedeemStatus = ({ withdrawalId, orderId }) =>
//     axios.post(`${SERVER_URL}/redeemStatus/${withdrawalId}`, { orderId })
//         .then(response => response.data)
//         .catch(error => Promise.reject(error));

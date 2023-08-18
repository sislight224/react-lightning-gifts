// NPM Dependencies
import axios from 'axios';

// Util Dependencies
import { SERVER_URL } from 'utils/constants';

export const createInvoice = ({ amount, senderName, senderMessage }) => axios.post(`${SERVER_URL}/create`, { amount, senderName, senderMessage })
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

export const getInvoiceStatus = (chargeId) => axios.get(`${SERVER_URL}/status/${chargeId}`)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));

// Local Dependencies
import { REPLACE_INVOICE_STATUS_DELTA, UPDATE_INVOICE_PAYMENT_STATUS_DELTA } from './actions';

const initialState = {
    invoiceStatus: {}
};

function replaceInvoiceStatus(state, invoiceStatus) {
    return {
        ...state,
        invoiceStatus
    };
}

function updateInvoicePaymentStatus(state, paymentStatus) {
    return {
        ...state,
        invoiceStatus: { ...state.invoiceStatus, status: paymentStatus.status }
    };
}

export default function createReducer(state = initialState, action = {}) {
    switch (action.type) {
        case REPLACE_INVOICE_STATUS_DELTA:
            return replaceInvoiceStatus(state, action.payload);
        case UPDATE_INVOICE_PAYMENT_STATUS_DELTA:
            return updateInvoicePaymentStatus(state, action.payload);
        default:
            return state;
    }
}

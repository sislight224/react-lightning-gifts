// Lib Dependencies
import {
    createActionCreator,
    createDeltaAction,
    createSignalAction
} from 'lib/redux';

// Module Name
export const MODULE_NAME = 'CREATE';

// Action Types
export const CREATE_INVOICE = 'CREATE_INVOICE';
export const REPLACE_INVOICE_STATUS = 'REPLACE_INVOICE_STATUS';
export const CHECK_INVOICE_STATUS = 'CHECK_INVOICE_STATUS';
export const START_RT_CHECK_INVOICE_STATUS = 'START_RT_CHECK_INVOICE_STATUS';
export const STOP_RT_CHECK_INVOICE_STATUS = 'STOP_RT_CHECK_INVOICE_STATUS';
export const UPDATE_INVOICE_PAYMENT_STATUS = 'UPDATE_INVOICE_PAYMENT_STATUS';


// Signals
export const createInvoiceSignal = createSignalAction(MODULE_NAME, CREATE_INVOICE);
export const checkInvoiceStatusSignal = createSignalAction(MODULE_NAME, CHECK_INVOICE_STATUS);
export const startRealTimeCheckInvoiceStatusSignal = createSignalAction(MODULE_NAME, START_RT_CHECK_INVOICE_STATUS);
export const stopRealTimeCheckInvoiceStatusSignal = createSignalAction(MODULE_NAME, STOP_RT_CHECK_INVOICE_STATUS);


// Deltas
export const REPLACE_INVOICE_STATUS_DELTA = createDeltaAction(MODULE_NAME, REPLACE_INVOICE_STATUS);
export const UPDATE_INVOICE_PAYMENT_STATUS_DELTA = createDeltaAction(MODULE_NAME, UPDATE_INVOICE_PAYMENT_STATUS);
// export const UPDATE_ERROR_STATE_DELTA = createDeltaAction(MODULE_NAME, UPDATE_ERROR_STATE);

// Action Creators
export const replaceInvoiceStatus = createActionCreator(REPLACE_INVOICE_STATUS_DELTA);
export const updateInvoicePaymentStatus = createActionCreator(UPDATE_INVOICE_PAYMENT_STATUS_DELTA);

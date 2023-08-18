// Lib Dependencies
import {
    createActionCreator,
    createDeltaAction,
    createSignalAction
} from 'lib/redux';

// Module Name
export const MODULE_NAME = 'REDEEM';

// Action Types
export const GET_GIFT_DETAILS = 'GET_GIFT_DETAILS';
export const START_GIFT_STATUS_POLLING = 'START_GIFT_STATUS_POLLING';
export const STOP_GIFT_STATUS_POLLING = 'STOP_GIFT_STATUS_POLLING';
export const REPLACE_GIFT_DETAILS = 'REPLACE_GIFT_DETAILS';
export const REDEEM_GIFT = 'REDEEM_GIFT';
// export const START_CHECK_REDEEM_STATUS = 'START_CHECK_REDEEM_STATUS';
// export const STOP_CHECK_REDEEM_STATUS = 'STOP_CHECK_REDEEM_STATUS';
// export const REPLACE_REDEEM_STATUS = 'REPLACE_REDEEM_STATUS';

// Signals
export const getGiftDetailsSignal = createSignalAction(MODULE_NAME, GET_GIFT_DETAILS);
export const startGiftStatusPollingSignal = createSignalAction(MODULE_NAME, START_GIFT_STATUS_POLLING);
export const stopGiftStatusPollingSignal = createSignalAction(MODULE_NAME, STOP_GIFT_STATUS_POLLING);
export const redeemGiftSignal = createSignalAction(MODULE_NAME, REDEEM_GIFT);
// export const startCheckRedeemStatusSignal = createSignalAction(MODULE_NAME, START_CHECK_REDEEM_STATUS);
// export const stopCheckRedeemStatusSignal = createSignalAction(MODULE_NAME, STOP_CHECK_REDEEM_STATUS);

// Deltas
export const REPLACE_GIFT_DETAILS_DELTA = createDeltaAction(MODULE_NAME, REPLACE_GIFT_DETAILS);
// export const REPLACE_REDEEM_STATUS_DELTA = createDeltaAction(MODULE_NAME, REPLACE_REDEEM_STATUS);

// Action Creators
export const replaceGiftDetails = createActionCreator(REPLACE_GIFT_DETAILS_DELTA);
// export const replaceRedeemStatus = createActionCreator(REPLACE_REDEEM_STATUS_DELTA);

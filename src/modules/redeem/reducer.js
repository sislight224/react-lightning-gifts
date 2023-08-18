// Local Dependencies
import { REPLACE_GIFT_DETAILS_DELTA } from './actions';

const initialState = {
    giftDetails: {},
    redeemStatus: {}
};

function replaceGiftDetails(state, giftDetails) {
    return {
        ...state,
        giftDetails
    };
}

// function replaceRedeemStatus(state, redeemStatus) {
//     return {
//         ...state,
//         redeemStatus
//     };
// }

export default function redeemReducer(state = initialState, action = {}) {
    switch (action.type) {
        case REPLACE_GIFT_DETAILS_DELTA:
            return replaceGiftDetails(state, action.payload);
        // case REPLACE_REDEEM_STATUS_DELTA:
        //     return replaceRedeemStatus(state, action.payload);
        default:
            return state;
    }
}

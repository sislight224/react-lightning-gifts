// NPM Dependencies
import {
    fork, takeLatest, put, call, race, take, delay
} from 'redux-saga/effects';

// Local Dependencies
import { getGiftDetails, redeemGift } from './services';
import {
    getGiftDetailsSignal,
    startGiftStatusPollingSignal,
    stopGiftStatusPollingSignal,
    redeemGiftSignal,
    replaceGiftDetails
} from './actions';

export function* getGiftDetailsOnRequest({ payload }) {
    try {
        const { orderId, verifyCode = null } = payload;

        const giftDetails = yield call(getGiftDetails, { orderId, verifyCode });

        yield put(replaceGiftDetails(giftDetails));

        yield put(getGiftDetailsSignal.success(giftDetails));
    } catch (error) {
        yield put(replaceGiftDetails('notFound'));

        yield put(getGiftDetailsSignal.failure({ error }));
    }
}

export function* watchGetGiftDetailsSignal() {
    yield takeLatest(
        getGiftDetailsSignal.REQUEST,
        getGiftDetailsOnRequest
    );
}

export function* giftStatusPolling({ payload }) {
    while (true) {
        const { orderId, verifyCode = null } = payload;

        try {
            yield put(getGiftDetailsSignal.request({ orderId, verifyCode }));

            yield delay(5000);
        } catch (error) {
            yield put(startGiftStatusPollingSignal.failure({ error }));

            yield delay(5000);
        }
    }
}

export function* watchGiftStatusPollingSignal() {
    while (true) {
        const payload = yield take(startGiftStatusPollingSignal.REQUEST);

        yield race([
            call(giftStatusPolling, payload),
            take(stopGiftStatusPollingSignal.REQUEST)
        ]);
    }
}

export function* redeemGiftOnRequest({ payload }) {
    try {
        const { orderId, invoice, verifyCode = null } = payload;

        const redeemGiftRequest = yield call(redeemGift, { orderId, invoice, verifyCode });

        yield put(redeemGiftSignal.success(redeemGiftRequest));
    } catch (error) {
        yield put(redeemGiftSignal.failure({ error }));
    }
}

export function* watchRedeemGiftDetailsSignal() {
    yield takeLatest(
        redeemGiftSignal.REQUEST,
        redeemGiftOnRequest
    );
}

// export function* startCheckRedeemStatusOnRequest({ payload }) {
//     while (true) {
//         const { withdrawalId, orderId } = payload;
//
//         try {
//             const redeemStatus = yield call(getRedeemStatus, { withdrawalId, orderId });
//
//             yield put(replaceRedeemStatus(redeemStatus));
//
//             if (redeemStatus.status === 'confirmed') {
//                 // Give BE .5 secs to update
//                 yield call(delay, 500);
//
//                 yield put(getGiftDetailsSignal.request({ orderId }));
//
//                 yield put(stopCheckRedeemStatusSignal.request());
//             } else {
//                 yield call(delay, 5000);
//             }
//         } catch (error) {
//             yield put(startCheckRedeemStatusSignal.failure({ error }));
//
//             yield put(replaceRedeemStatus({ error: 'fail' }));
//
//             yield put(stopCheckRedeemStatusSignal.request());
//
//             // yield call(delay, 15000);
//         }
//     }
// }

// export function* watchStartCheckRedeemStatusSignal() {
//     while (true) {
//         const payload = yield take(startCheckRedeemStatusSignal.REQUEST);
//
//         yield race([
//             call(startCheckRedeemStatusOnRequest, payload),
//             take(stopCheckRedeemStatusSignal.REQUEST)
//         ]);
//     }
// }

export default [
    fork(watchRedeemGiftDetailsSignal),
    fork(watchGetGiftDetailsSignal),
    fork(watchGiftStatusPollingSignal)
    // fork(watchStartCheckRedeemStatusSignal)
];

// NPM Dependencies
import {
    fork, takeLatest, put, call, race, take, delay
} from 'redux-saga/effects';

// Local Dependencies
import { createInvoice, getInvoiceStatus } from './services';
import {
    createInvoiceSignal,
    replaceInvoiceStatus,
    updateInvoicePaymentStatus,
    checkInvoiceStatusSignal,
    startRealTimeCheckInvoiceStatusSignal,
    stopRealTimeCheckInvoiceStatusSignal
} from './actions';

export function* createInvoiceOnRequest({ payload }) {
    try {
        const { amount, senderName, senderMessage } = payload;

        const invoice = yield call(createInvoice, { amount, senderName, senderMessage });

        yield put(replaceInvoiceStatus(invoice));

        yield put(createInvoiceSignal.success(invoice));

        yield put(startRealTimeCheckInvoiceStatusSignal.request({ chargeId: invoice.chargeId }));
    } catch (error) {
        yield put(createInvoiceSignal.failure({ error }));
    }
}

export function* watchCreateInvoiceSignal() {
    yield takeLatest(
        createInvoiceSignal.REQUEST,
        createInvoiceOnRequest
    );
}

export function* checkInvoiceStatusOnRequest({ payload }) {
    try {
        const { chargeId } = payload;

        const invoiceStatus = yield call(getInvoiceStatus, chargeId);

        yield put(replaceInvoiceStatus(invoiceStatus));

        yield put(checkInvoiceStatusSignal.success(invoiceStatus));
    } catch (error) {
        yield put(checkInvoiceStatusSignal.failure({ error }));
    }
}

export function* watchCheckInvoiceStatusSignal() {
    yield takeLatest(
        checkInvoiceStatusSignal.REQUEST,
        checkInvoiceStatusOnRequest
    );
}

export function* startRealTimeCheckInvoiceStatusOnRequest({ payload }) {
    while (true) {
        const { chargeId } = payload;

        try {
            const invoiceStatus = yield call(getInvoiceStatus, chargeId);

            yield put(updateInvoicePaymentStatus(invoiceStatus));

            if (invoiceStatus.status === 'paid') {
                yield put(stopRealTimeCheckInvoiceStatusSignal.request());
            }

            yield delay(5000);
        } catch (error) {
            yield put(startRealTimeCheckInvoiceStatusSignal.failure({ error }));

            yield delay(15000);
        }
    }
}

export function* watchStartRealTimeCheckInvoiceStatusSignal() {
    while (true) {
        const payload = yield take(startRealTimeCheckInvoiceStatusSignal.REQUEST);

        yield race([
            call(startRealTimeCheckInvoiceStatusOnRequest, payload),
            take(stopRealTimeCheckInvoiceStatusSignal.REQUEST)
        ]);
    }
}

export default [
    fork(watchCreateInvoiceSignal),
    fork(watchCheckInvoiceStatusSignal),
    fork(watchStartRealTimeCheckInvoiceStatusSignal)
];

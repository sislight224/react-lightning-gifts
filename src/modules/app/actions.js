// Lib Dependencies
import {
    createSignalAction,
    createDeltaAction,
    createActionCreator
} from 'lib/redux';

const MODULE_NAME = 'APP';

// Action Types
export const INIT = 'INIT';
export const UPDATE_APPLICATION_STATE = 'UPDATE_APPLICATION_STATE';
export const UPDATE_ERROR_STATE = 'UPDATE_ERROR_STATE';

// Signals
export const initApplicationSignal = createSignalAction(MODULE_NAME, INIT);

// Deltas
export const UPDATE_APPLICATION_STATE_DELTA = createDeltaAction(MODULE_NAME, UPDATE_APPLICATION_STATE);
export const UPDATE_ERROR_STATE_DELTA = createDeltaAction(MODULE_NAME, UPDATE_ERROR_STATE);

// Action Creators
export const updateApplicationState = createActionCreator(UPDATE_APPLICATION_STATE_DELTA);
export const updateErrorState = createActionCreator(UPDATE_ERROR_STATE_DELTA);

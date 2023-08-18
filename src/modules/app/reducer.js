// Local Dependencies
import {
    UPDATE_APPLICATION_STATE_DELTA,
    UPDATE_ERROR_STATE_DELTA
} from './actions';

/**
 * Initial state for application reducer
 * @type {Object}
 */
export const initialState = {
    isLoading: true,
    initialised: false,
    error: null
};

/**
 * Update application state
 * @param {object} state - Application state
 * @param {object} payload - Action payload
 * @param {boolean} payload.isLoading - True if the application is loading
 * @param {boolean} payload.initialised - True if the application has been initialised
 * @returns {object} Updated application state
 */
function updateApplicationState(state, { isLoading, initialised }) {
    return {
        ...state,
        isLoading,
        initialised
    };
}


/**
 * Update error state.
 * @param {object} state - Application state
 * @param {object} payload - Action payload
 * @param {object|null} payload.error - Error that occured within application
 * @returns {object} Updated application state
 */
function updateErrorState(state, { error }) {
    return {
        ...state,
        error
    };
}

/**
 * To store the application initialisation state
 * @param {object} state - initialisation state
 * @param {boolean} state.isLoading - true if the the application is in initialisation process
 * @param {boolean} state.initialised - true if the the application is initialised
 * @param {object|null} state.error - the error occurred in initialisation process
 * @param {object} action - The action type and data which has been dispatched
 * @param {string} action.type - action event type
 * @param {object} action.payload - data object carried through action
 * @returns {object} new state object returned by reducer function
 */
export default function applicationReducer(state = initialState, action = {}) {
    switch (action.type) {
        case UPDATE_APPLICATION_STATE_DELTA:
            return updateApplicationState(state, action.payload);
        case UPDATE_ERROR_STATE_DELTA:
            return updateErrorState(state, action.payload);
        default:
            return state;
    }
}

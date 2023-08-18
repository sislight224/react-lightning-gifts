// NPM Dependencies
import { combineReducers } from 'redux';

// Module Dependencies
import applicationReducer from 'modules/app/reducer';
import createReducer from 'modules/create/reducer';
import redeemReducer from 'modules/redeem/reducer';

/**
 * Mapping of all reducers within the application.
 * @type {Object}
 */
const reducers = {
    application: applicationReducer,
    create: createReducer,
    redeem: redeemReducer
};

/**
 * Combines all the reducers to pass into redux.
 * @return {Object} An object containing all the reducers to load into the redux store.
 */
const getReducers = () => combineReducers(reducers);

export default getReducers;

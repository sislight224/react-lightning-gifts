// NPM Dependencies
import { compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';

const { NODE_ENV } = process.env;

/**
 * Filter out actions from the redux logger
 * @param  {object} state - Redux store state.
 * @param  {object} action - Action being passed to Redux.
 * @return {boolean} A boolean to determine whether to log the action.
 */
const filterActions = (state, action) => {
    if (!process.env.REDUX_LOGGER_PREDICATE_REGEX) {
        return true;
    }

    const regex = new RegExp(process.env.REDUX_LOGGER_PREDICATE_REGEX);
    return !action.type || !action.type.match(regex);
};

/**
 * Dev tools extension.
 * @type {object}
 */
export const devTools = window.devToolsExtension ? window.devToolsExtension({
    predicate: filterActions
}) : (f) => f;

/**
 * Redux saga middleware
 * @type {function}
 */
export const reduxSagaMiddleware = createSagaMiddleware();

/**
 * Creates the middleware object to pass into redux.
 * @return {Object} An object containing all the middleware to load into redux.
 */
const getMiddleware = () => compose(
    applyMiddleware(
        reduxSagaMiddleware,
        ...(NODE_ENV !== 'production' ? [createLogger({ predicate: filterActions })] : [])
    ),
    devTools
);

export default getMiddleware;

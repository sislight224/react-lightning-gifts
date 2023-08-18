// NPM Dependencies
import { createStore } from 'redux';

// Module Dependencies
import { initApplicationSignal } from 'modules/app/actions';

// Local Dependencies
import getReducers from './reducers';
import getMiddleware, { reduxSagaMiddleware } from './middleware';
import rootSaga from './rootSaga';

/**
 * Single instance of the Redux Store.
 * @type {[type]}
 */
const reduxStore = createStore(
    getReducers(),
    getMiddleware()
);

// Bootstrap all sagas upon application initialisation.
reduxSagaMiddleware.run(rootSaga);

// Bootstrap the application upon DOMContentLoaded, with the BOOT action
// dispatched, the whole application initialisation chain will kick off.
document.addEventListener('DOMContentLoaded', () => {
    reduxStore.dispatch(initApplicationSignal.request());
});

export default reduxStore;

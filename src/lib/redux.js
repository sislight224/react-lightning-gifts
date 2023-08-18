/**
 * Simple action creator
 * @param {String} type - action type
 * @returns {Function} action creator function which helps to inject payloads into an action
 */
export const createActionCreator = (type) => (payload, meta) => {
    return {
        type,
        payload,
        meta
    };
};

/**
 * Signal action creator
 * @example
 * // returns {
 * //   REQUEST: 'SIGNAL/ASSETS/INIT/REQUEST',
 * //   SUCCESS: 'SIGNAL/ASSETS/INIT/SUCCESS',
 * //   FAILURE: 'SIGNAL/ASSETS/INIT/FAILURE',
 * //   request: arg => { type: 'SIGNAL/ASSETS/INIT/REQUEST', data: arg },
 * //   success: arg => { type: 'SIGNAL/ASSETS/INIT/SUCCESS', data: arg },
 * //   failure: arg => { type: 'SIGNAL/ASSETS/INIT/FAILURE', data: arg }
 * // }
 * createSignalAction('ASSETS', 'INIT')
 * @param {String} moduleName - name of module
 * @param {String} actionBasename - name of action
 * @returns {Object} signal action events and creators
 */
export const createSignalAction = (moduleName, actionBasename) => (
    ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, actionSuffix) => {
        prev[actionSuffix] = `SIGNAL/${moduleName}/${actionBasename}/${actionSuffix}`;
        prev[actionSuffix.toLowerCase()] = createActionCreator(prev[actionSuffix]);

        return prev;
    }, {})
);

/**
 * Delta action creator
 * @param {String} moduleName - name of module
 * @param {String} actionBasename - name of action
 * @returns {string} a single delta action event
 */
export const createDeltaAction = (moduleName, actionBasename) => (
    `DELTA/${moduleName}/${actionBasename}`
);

/**
 * web worker action creator
 * @param {String} type - action type
 * @returns {Function} action creator function which helps to inject payloads into an action
 */
export const createWorkerActionCreator = (type) => (payload) => {
    return {
        meta: { webWorker: true },
        type,
        payload
    };
};

/**
 * Web worker action creator
 * @example
 * // returns {
 * //   REQUEST: 'WEB_WORKER/ASSETS/INIT/REQUEST',
 * //   SUCCESS: 'WEB_WORKER/ASSETS/INIT/SUCCESS',
 * //   FAILURE: 'WEB_WORKER/ASSETS/INIT/FAILURE',
 * //   request: arg => { type: 'WEB_WORKER/ASSETS/INIT/REQUEST', data: arg },
 * //   success: arg => { type: 'WEB_WORKER/ASSETS/INIT/SUCCESS', data: arg },
 * //   failure: arg => { type: 'WEB_WORKER/ASSETS/INIT/FAILURE', data: arg }
 * // }
 * createWebWorkerAction('ASSETS', 'INIT')
 * @param {String} moduleName - name of module
 * @param {String} actionBasename - name of action
 * @returns {Object} signal action events and creators
 */
export const createWebWorkerAction = (moduleName, actionBasename) => (
    ['REQUEST', 'SUCCESS', 'FAILURE'].reduce((prev, actionSuffix) => {
        prev[actionSuffix] = `WEB_WORKER/${moduleName}/${actionBasename}/${actionSuffix}`;
        prev[actionSuffix.toLowerCase()] = createWorkerActionCreator(prev[actionSuffix]);
        return prev;
    }, {})
);

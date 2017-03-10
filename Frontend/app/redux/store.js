import { createStore, applyMiddleware } from 'redux';
// import createLogger from 'redux-logger';

import reducer from './reducer';

// const logger = createLogger();
//
// const store = createStore(
//   reducer,
//   applyMiddleware(logger)
// );

const store = createStore(reducer);

export default store;

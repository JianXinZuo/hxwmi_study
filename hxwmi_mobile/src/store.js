import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';

export default createStore(
    reducers, 
    applyMiddleware(thunk)
);
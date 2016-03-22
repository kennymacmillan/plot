import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import routes from '../shared/routes';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import * as reducers from '../shared/reducers';
import { fromJS } from 'immutable';

const history = createBrowserHistory();

const initialState = window.__INITIAL_STATE__;

/* transform into Immutable.js collections,
 * but leave top level keys untouched for Redux */
Object
  .keys(initialState)
  .forEach(key => {
    initialState[key] = fromJS(initialState[key]);
  });

const reducer = combineReducers(reducers);
const store = createStore(reducer, initialState);

render(
  <Provider store={store}>
    <Router children={routes} history={history} />
  </Provider>,
  document.getElementById('react-view')
);

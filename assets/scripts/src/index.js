import 'babel-core/polyfill';
import React from 'react';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import configureStore from './store/configureStore';
import Task from './containers/Task';

const history = createBrowserHistory();
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/todo"
             component={Task}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore , applyMiddleware , compose} from 'redux';
import ReduxPromise from 'redux-promise';
import thunk from 'redux-thunk';
import reducers from './reducers/index';
import App from './components/App';

injectTapEventPlugin();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const StoreWithMiddleware = createStore(reducers ,composeEnhancers(applyMiddleware(ReduxPromise , thunk)));

ReactDOM.render(
  <Provider store={StoreWithMiddleware}>
    <Router>
      <App/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

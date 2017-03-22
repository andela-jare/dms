import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { cyan500 } from 'material-ui/styles/colors';
import rootReducer from './reducers';
import App from './App';
import './index.css';

const store = createStore(rootReducer,
  applyMiddleware(thunk, reduxImmutableStateInvariant())
);

injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    textColor: cyan500,
  }
});

ReactDOM.render(
  <Provider store={store}>
    <MuiThemeProvider muiTheme={muiTheme}>
      <App />
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
);

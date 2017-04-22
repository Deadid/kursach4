import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/AppContainer';
import { AppContainer } from 'react-hot-loader';
import { overrideComponentTypeChecker } from 'react-toolbox';
import createStore from './store/createStore'

const rootEl = document.getElementById('app');
const initialState = window.___INITIAL_STATE__
const store = createStore(initialState)
const render = () => {
  const routes = require('./routes/index').default(store)
  ReactDOM.render(
    <AppContainer>
      <App store={store} routes={routes} />
    </AppContainer>,
    rootEl
  );
};

if (process.env.NODE_ENV !== 'production') {
  overrideComponentTypeChecker((classType, reactElement) => (
    reactElement && (
      reactElement.type === classType
      || reactElement.type.name === classType.displayName
    )
  ));
  if (module.hot) {
    module.hot.accept('./component/App', render);
  }
}

render();

import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';

import configureStore, { history } from 'store/configure';
import Home from 'containers/Home';
import Page404 from 'containers/Page404';

import logo from 'static/img/logo.svg';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
          </header>
          <main>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route component={Page404} />
            </Switch>
          </main>
        </div>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;

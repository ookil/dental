import { ApolloProvider } from '@apollo/client';
import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { ModalProvider } from 'styled-react-modal';
import { client } from '.';
import { MainModal, Navbar, Toolbar } from './components';
import GlobalStyle from './globalStyles';
import { Dashboard } from './pages';
import store from './store/store';

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <ModalProvider>
            <MainModal />
            <Redirect from='/' to='/dashboard' />
            <Navbar />
            <Toolbar />
            <Switch>
              <Route path='/:page' component={Dashboard} />
            </Switch>
          </ModalProvider>
        </Router>
      </Provider>
    </ApolloProvider>
  );
}

export default App;

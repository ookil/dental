import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Navbar, Toolbar } from './components';
import GlobalStyle from './globalStyles';
import { Dashboard } from './pages';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Redirect from="/" to="/dashboard" />
      <Navbar />
      <Toolbar />
      <Switch>
        <Route path='/:page' component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;

import React from 'react'
import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './screens';
import SigninPage from './screens/signin'
import SignupPage from './screens/signup'
import templatesPage from './screens/templates'
import detailPage from './screens/Detail'
import Dashboard from './screens/Dashboard';
import Profile from './screens/Profile';

import Cv from './screens/Cv';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/cv/:user" component={Cv} />
        <Route path="/signin" component={SigninPage} exact />
        <Route path="/signup" component={SignupPage} exact />
        <Route path="/templates" component={templatesPage} exact />
        <Route path="/templates/:id" component={detailPage} />
        <Route path="/dashboard" component={Dashboard} exact />
        <Route path="/dashboard/:str" component={Dashboard} />
        <Route path="/profile" component={Profile} exact />
      </Switch>
    </Router>
  );
}

export default App;

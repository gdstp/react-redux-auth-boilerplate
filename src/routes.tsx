import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Homepage from './pages/Homepage';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/auth/PrivateRoute';
import PublicRoute from './components/auth/PublicRoute';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path="/login" component={SignIn} />
        <PublicRoute path="/register" component={SignUp} />

        <PrivateRoute exact path="/" component={Homepage} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

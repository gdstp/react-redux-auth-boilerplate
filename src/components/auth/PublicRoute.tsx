import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect, RouteProps } from 'react-router-dom';

import { RootState } from '../../store';

interface Props extends RouteProps {
  component: any;
}

const PublicRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
  const { authenticated } = useSelector((state: RootState) => state.auth);

  return (
    <Route {...rest} render={props => !authenticated ? <Component {...props} /> : <Redirect to="/dashboard" />} />
  );

}

export default PublicRoute;
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import NewPost from './pages/postNew';
import List from './pages/list';
import Home from './pages/home';
import Detail from './pages/postDetail';
import Login from './pages/login';
import Register from './pages/register';
import Forgot from './pages/forgot';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path='/' exact />

      <Route component={Detail} path='/detail/:id' />
      <PrivateRoute component={NewPost} path='/create' />
      <Route component={Login} path='/login' />
      <Route component={Forgot} path='/forgot' />
      <Route component={Register} path='/register' />
      <Route component={List} path='/list' />
      <Redirect path='/' to='/' />
    </Switch>
  );
};

export default Routes;

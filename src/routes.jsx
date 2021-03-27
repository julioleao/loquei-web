import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux';

import List from './pages/list';
import Home from './pages/home';
import Detail from './pages/postDetail';
import Forgot from './pages/forgot';
import Auth from './pages/auth';
import Profile from './pages/profile';
import NewPost from './pages/newPost';

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
            to={{ pathname: '/auth', state: { from: props.location } }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Switch>
      <PrivateRoute component={NewPost} path='/create' />

      <PrivateRoute component={Profile} path='/profile' />

      <Route component={Home} path='/' exact />
      <Route component={Detail} path='/detail/:id' />
      <Route component={Auth} path='/auth' />
      <Route component={Forgot} path='/forgot' />
      <Route component={List} path='/list' />
      <Redirect path='/' to='/' />
    </Switch>
  );
};

export default Routes;

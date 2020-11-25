import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NewPost from './pages/newAd';
import List from './pages/list';
import Home from './pages/home';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={NewPost} path='/new_post' />
      <Route component={List} path='/list' />
      <Redirect path='/' to='/' />
    </Switch>
  );
};

export default Routes;

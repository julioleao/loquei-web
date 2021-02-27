import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import NewPost from './pages/postNew';
import List from './pages/list';
import Home from './pages/home';
import Detail from './pages/postDetail';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path='/' exact />

      <Route component={Detail} path='/detail/:id' />
      <Route component={NewPost} path='/create' />
      <Route component={List} path='/list' />
      <Redirect path='/' to='/' />
    </Switch>
  );
};

export default Routes;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import CadastrarImovel from './pages/newAd';
import Home from './pages/home';

const Routes = () => {
  return (
    <Switch>
      <Route component={Home} path='/' exact />
      <Route component={CadastrarImovel} path='/new_ad' />
    </Switch>
  );
};

export default Routes;

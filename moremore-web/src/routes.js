import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Shop, About } from './Pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/shop" component={Shop} />
    <Route path="/About" component={About} />
  </Switch>
);

export default Routes;

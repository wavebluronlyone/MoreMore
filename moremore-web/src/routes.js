import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Shop, About, Login, Register } from './Pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Shop" component={Shop} />
    <Route path="/About" component={About} />
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
  </Switch>
);

export default Routes;

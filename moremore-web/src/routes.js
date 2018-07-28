import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Home, Shop, About, Login, Register, Profile } from './Pages';

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/Shop" component={Shop} />
    <Route path="/About" component={About} />
    <Route path="/Login" component={Login} />
    <Route path="/Register" component={Register} />
    <Route path="/Profile" component={Profile} />
  </Switch>
);

export default Routes;

import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Shop,
  About,
  Login,
  Register,
  Sheeter,
  Profile,
  BuyComplete,
  DetailSheet,
  Cart,
  BuyCancel,
  ReadSheet,
  ForgotPassword
} from "./Pages";
import Admin from "./AdminPages/Admin";

const Routes = () => (
  <Switch>
    <Route exact path="/" render={props => <Home {...props} />} />
    <Route path="/Shop" render={props => <Shop {...props} />} />
    <Route path="/Cart" render={props => <Cart {...props} />} />
    <Route path="/About" render={props => <About />} />
    <Route path="/Login" render={props => <Login {...props} />} />
    <Route path="/Sheeter" render={props => <Sheeter {...props} />} />
    <Route
      path="/ForgotPassword"
      render={props => <ForgotPassword {...props} />}
    />
    <Route path="/Register" render={props => <Register {...props} />} />
    <Route path="/Profile" render={props => <Profile {...props} />} />
    <Route
      path="/DetailSheet/:id"
      render={props => <DetailSheet {...props} />}
    />
    <Route path="/BuyComplete" render={props => <BuyComplete {...props} />} />
    <Route path="/BuyCancel" render={props => <BuyCancel {...props} />} />
    <Route path="/ReadSheet/:id" render={props => <ReadSheet {...props} />} />
    <Route path="/Admin" render={props => <Admin {...props} />} />
  </Switch>
);

export default Routes;

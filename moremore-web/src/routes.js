import React from "react";
import { Switch, Route } from "react-router-dom";
import {
  Home,
  Shop,
  About,
  Login,
  Register,
  Profile,
  Buy,
  BuyComplete,
  DetailProduct
} from "./Pages";
import Navigationbar from "./Components/Navigationbar";
import { AdminLogin } from "./AdminPages";
import Admin from "./AdminPages/Admin";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Home {...props} />
        </div>
      )}
    />
    <Route
      path="/Shop"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Shop {...props} />
        </div>
      )}
    />
    <Route
      path="/About"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <About />
        </div>
      )}
    />
    <Route
      path="/Login"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Login {...props} />
        </div>
      )}
    />
    <Route
      path="/Register"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Register />
        </div>
      )}
    />
    <Route
      path="/Profile"
      render={props => (
        <div>
          <Navigationbar show={true} {...props} />
          <Profile />
        </div>
      )}
    />
    <Route
      path="/DetailProduct/:id"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <DetailProduct show={false} {...props} />
        </div>
      )}
    />
    <Route
      path="/Buy/:id"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Buy {...props} />
        </div>
      )}
    />

    <Route
      path="/BuyComplete/:id"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <BuyComplete {...props} />
        </div>
      )}
    />

    <Route path="/AdminLogin" render={props => <AdminLogin {...props} />} />
    <Route path="/Admin" render={props => <Admin {...props} />} />
  </Switch>
);

export default Routes;

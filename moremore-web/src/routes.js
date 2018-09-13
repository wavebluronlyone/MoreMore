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
  DetailProduct
} from "./Pages";
import Navigationbar from "./Components/Navigationbar";

const Routes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Home />
        </div>
      )}
    />
    <Route
      path="/Shop"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Shop />
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
          <Login />
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
      path="/name"
      render={props => (
        <div>
          <Navigationbar show={true} {...props} />
          <Home />
        </div>
      )}
    />
    <Route
      path={"/MyShop/name"}
      render={props => (
        <div>
          <Navigationbar show={true} {...props} />
          <Shop />
        </div>
      )}
    />
    <Route
      path="/MyAbout/name"
      render={props => (
        <div>
          <Navigationbar show={true} {...props} />
          <About />
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
          <DetailProduct {...props} />
        </div>
      )}
    /> 
    <Route
      path="/Buy"
      render={props => (
        <div>
          <Navigationbar show={false} {...props} />
          <Buy />
        </div>
      )}
    />
  </Switch>
);

export default Routes;

import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { signInWithEmail } from "../Actions/UserActions";

class Login extends Component {
  submit = values => {
    signInWithEmail(values.email, values.password);
  };
  render() {
    return <LoginForm onSubmit={this.submit} />;
  }
}

export default Login;

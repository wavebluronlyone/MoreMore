import React, { Component } from "react";
import RegisterForm from "../Components/RegisterForm";
import { registerWithEmail } from "../Actions/UserActions";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  registerWithEmail: (email, pass, confirmPass, user) => {
    dispatch(registerWithEmail(email, pass, confirmPass, user));
  }
});

class Register extends Component {
  submit = values => {
    this.props.registerWithEmail(
      values.email,
      values.password,
      values.confirmPassword,
      values.user
    );
  };
  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.submit} />
        <br />
        <br />
        <p>{this.props.user.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Register);

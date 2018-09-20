import React, { Component } from "react";
import RegisterForm from "../Components/RegisterForm";
import { registerWithEmail } from "../Actions/UserActions";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  registerWithEmail: (email, pass, user) => {
    dispatch(registerWithEmail(email, pass, user));
  }
});

class Register extends Component {
  submit = values => {
    this.props.registerWithEmail(values.email, values.password, values.user);
  };
  render() {
    return (
      <div>
        <RegisterForm onSubmit={this.submit} />
        <p>{this.props.user.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Register);

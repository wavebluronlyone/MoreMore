import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { isAdminLoggedIn, signInWithEmail } from "../Actions/AdminActions";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  signInWithEmail: (user, password) => {
    dispatch(signInWithEmail(user, password));
  },
  isAdminLoggedIn: () => {
    dispatch(isAdminLoggedIn());
  }
});

class AdminLogin extends Component {
  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
  };
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.submit} />
        <p>{this.props.admin.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AdminLogin);

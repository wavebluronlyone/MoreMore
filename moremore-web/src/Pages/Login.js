import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { signInWithEmail } from "../Actions/UserActions";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  signInWithEmail: (user,pass) => {
    dispatch(signInWithEmail(user,pass));
  }
});

class Login extends Component {
  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
  };
  render() {
    return (
      <div>
        <LoginForm onSubmit={this.submit} />
        <p>{this.props.user.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);

import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { signInWithEmail, isLoggedIn } from "../Actions/UserActions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  signInWithEmail: (user, pass) => {
    dispatch(signInWithEmail(user, pass));
  },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Login extends Component {
  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
  };
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    const { from } = { from: { pathname: "/" } };
    if (this.props.user.isLoggedIn === true) {
      return <Redirect to={from} />;
    }
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

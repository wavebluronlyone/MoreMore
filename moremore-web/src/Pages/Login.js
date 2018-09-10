import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { signInWithEmail, isloggedIn } from "../Actions/UserActions";
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
  isloggedIn: () => {
    dispatch(isloggedIn());
  }
});

class Login extends Component {
  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
  };
  componentDidMount() {
    this.props.isloggedIn();
  }
  render() {
    const { from } = { from: { pathname: "/name" } };
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

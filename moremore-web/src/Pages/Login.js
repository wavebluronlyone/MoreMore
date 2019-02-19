import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import {
  signInWithEmail,
  isLoggedIn,
  findProfileWithEmail,
  signInWithFacebook
} from "../Actions/UserActions";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import "../Styles/App.css";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  signInWithEmail: (email, password) => {
    dispatch(signInWithEmail(email, password));
  },
  signInWithFacebook: (accessToken, image) => {
    dispatch(signInWithFacebook(accessToken, image));
  },
  findProfileWithEmail: email => {
    dispatch(findProfileWithEmail(email));
  },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Login extends Component {
  componentWillMount() {
    this.props.isLoggedIn();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.user.isLoggedIn === true) {
      this.props.history.push("/");
    }
  }

  responseFacebook = response => {
    this.props.signInWithFacebook(
      response.accessToken,
      response.picture.data.url
    );
  };

  submit = values => {
    this.props.signInWithEmail(values.email, values.password);
    this.props.findProfileWithEmail(values.email);
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p align="center">ลงชื่อเข้าสู่ระบบ</p>
        <FacebookLogin
          appId="512026392655945"
          fields="name,email,picture.type(large)"
          size="small"
          callback={this.responseFacebook}
          icon="fa-facebook"
        />
        <br />
        <br />
        <LoginForm message={this.props.user.message} onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);

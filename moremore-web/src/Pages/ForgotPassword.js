import React, { Component } from "react";
import ForgotPasswordForm from "../Components/ForgotPasswordForm";
import { sendEmailToResetPassword, resetMessage } from "../Actions/UserActions";
import "../Styles/App.css";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  sendEmailToResetPassword: email => {
    dispatch(sendEmailToResetPassword(email));
  },
  resetMessage: () => {
    dispatch(resetMessage());
  }
});

class ForgotPassword extends Component {
  componentWillUnmount() {
    this.props.resetMessage();
  }
  submit = values => {
    this.props.sendEmailToResetPassword(values.email);
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <ForgotPasswordForm onSubmit={this.submit} />
        <p>{this.props.user.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(ForgotPassword);

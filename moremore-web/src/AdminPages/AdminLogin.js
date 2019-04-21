import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import { isAdminLoggedIn, signInWithEmail } from "../Actions/AdminActions";
import { connect } from "react-redux";
import { Container, Message, Button } from "semantic-ui-react";
import FaFacebook from "react-icons/lib/fa/facebook";

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
        {this.props.admin.message !== "" ? (
          <Container>
            {this.props.admin.message !== undefined ? (
              <Message negative>
                <Message.Header>Error</Message.Header>
                <p>{this.props.admin.message}</p>
              </Message>
            ) : null}
          </Container>
        ) : null}
        <br />
        <br />
        <br />
        <p align="center">ลงชื่อเข้าสู่ระบบ</p>
        <div align="center">
          <Button primary>
            <FaFacebook /> &nbsp;login with facebook
          </Button>
        </div>
        <br />
        <br />
        <LoginForm onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AdminLogin);

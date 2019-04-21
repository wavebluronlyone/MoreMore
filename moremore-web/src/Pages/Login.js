import React, { Component } from "react";
import LoginForm from "../Components/LoginForm";
import {
  signInWithEmail,
  findProfileWithEmail,
  signInWithFacebook,
  resetMessage
} from "../Actions/UserActions";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login";
import "../Styles/App.css";
import { Segment, Message, Container, Icon } from "semantic-ui-react";

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
  resetMessage: () => {
    dispatch(resetMessage());
  }
});

class Login extends Component {
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

  componentDidUpdate(prevProps) {
    if (
      Boolean(localStorage.getItem('isloggedIn')) !== false &&
      Boolean(localStorage.getItem('isloggedIn')) !== undefined
    ) {
      this.props.history.push("/");
    }
  }

  componentWillUnmount() {
    this.props.resetMessage();
  }
  render() {
    return (
      <Segment
        style={{
          minHeight: "38em"
        }}
      >
        {this.props.user.message !== "" ? (
          <Container>
            {this.props.user.message !== undefined ? (
              <div>
                {this.props.user.positive === false ? (
                  <Message negative>
                    <Message.Header>Error</Message.Header>
                    <p>{this.props.user.message}</p>
                  </Message>
                ) : (
                  <Message icon>
                    <Icon name="circle notched" loading />
                    <Message.Content>
                      <Message.Header>Loading</Message.Header>
                      <p style={{ fontFamily: "Prompt" }}>
                        {this.props.user.message}
                      </p>
                    </Message.Content>
                  </Message>
                )}
              </div>
            ) : null}
          </Container>
        ) : null}
        <br />
        <h1 style={{ fontFamily: "Prompt" }} align="center">
          ลงชื่อเข้าสู่ระบบ
        </h1>
        <div align="center">
          <FacebookLogin
            style={{ fontFamily: "Prompt" }}
            appId="512026392655945"
            fields="name,email,picture.type(large)"
            size="small"
            callback={this.responseFacebook}
            icon="fa-facebook"
          />
        </div>
        <hr />
        <LoginForm onSubmit={this.submit} />
      </Segment>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Login);

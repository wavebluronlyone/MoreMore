import React, { Component } from "react";
import RegisterForm from "../Components/RegisterForm";
import { registerWithEmail, resetMessage } from "../Actions/UserActions";
import { connect } from "react-redux";
import { Segment, Message, Container } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  registerWithEmail: (email, pass, confirmPass, user) => {
    dispatch(registerWithEmail(email, pass, confirmPass, user));
  },
  resetMessage: () => {
    dispatch(resetMessage());
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
  componentDidUpdate(prevProps) {
    if (
      this.props.user.isLoggedIn !== false &&
      this.props.user.isLoggedIn !== undefined
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
                  <Message positive>
                    <Message.Header>Success</Message.Header>
                    <p>{this.props.user.message}</p>
                  </Message>
                )}
              </div>
            ) : null}
          </Container>
        ) : null}
        <br />
        <RegisterForm onSubmit={this.submit} />
      </Segment>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Register);

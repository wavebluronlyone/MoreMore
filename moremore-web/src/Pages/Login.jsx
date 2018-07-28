import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";
import FaFacebook from "react-icons/lib/fa/facebook";
import Navigationbar from "../Components/Navigationbar";

function Navbar(props) {
  if (!props.view) {
    return null;
  }
  return <Navigationbar view={true} />;
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
    this.handleToggleClick = this.handleToggleClick.bind(this);
  }

  handleToggleClick() {
    this.setState(prevState => ({
      isLoggedIn: !prevState.isLoggedIn
    }));
  }

  render() {
    return (
      <div>
        <br />
        <br />
        <br />
        <p align="center">ลงชื่อเข้าสู่ระบบ</p>
        <Button bsStyle="primary">
          <FaFacebook /> &nbsp;login with facebook
        </Button>
        <br />
        <br />
        <Form horizontal>
          <FormGroup controlId="formHorizontalEmail">
            <Col componentClass={ControlLabel} sm={2}>
              Username/Email:
            </Col>
            <Col sm={10}>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>

          <FormGroup controlId="formHorizontalPassword">
            <Col componentClass={ControlLabel} sm={2}>
              Password:
            </Col>
            <Col sm={10}>
              <FormControl type="password" placeholder="Password" />
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              ลืมรหัสผ่าน
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Navbar view={this.state.isLoggedIn} />
              <Button onClick={this.handleToggleClick}>Sign in</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

export default Login;

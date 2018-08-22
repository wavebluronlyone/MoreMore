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
import { Link } from "react-router-dom";

const Login = () => (
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
          <Link to="/name">
            <Button>Sign in</Button>
          </Link>
        </Col>
      </FormGroup>
    </Form>
  </div>
);

export default Login;

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
import { Field, reduxForm } from "redux-form";

const FieldInput = ({ type, placeholder, input }) => {
  return (
    <FormControl
      type={type}
      placeholder={placeholder}
      value={input.value}
      onChange={input.onChange}
    />
  );
};

let LoginForm = props => {
  const { handleSubmit } = props;
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

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Email: 
          </Col>
          <Col sm={10}>
            <Field
              name="email"
              type="email"
              component={FieldInput}
              placeholder="email"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Password:
          </Col>
          <Col sm={10}>
            <Field
              name="password"
              type="password"
              component={FieldInput}
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            ลืมรหัสผ่าน
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Sign in</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;

import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl
} from "react-bootstrap";
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

let RegisterForm = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <p align="left">สมัครสมาชิก | Register</p>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Username:
          </Col>
          <Col sm={10}>
            <Field
              name="user"
              type="text"
              component={FieldInput}
              placeholder="enter user"
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
              placeholder="enter password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Confirm Password:
          </Col>
          <Col sm={10}>
            <Field
              name="confirmPassword"
              type="password"
              component={FieldInput}
              placeholder="enter confirm password"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Email:
          </Col>
          <Col sm={10}>
            <Field
              name="email"
              type="email"
              component={FieldInput}
              placeholder="enter email"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <br />
            <Button type="submit">Sign up</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

RegisterForm = reduxForm({
  form: "register"
})(RegisterForm);

export default RegisterForm;

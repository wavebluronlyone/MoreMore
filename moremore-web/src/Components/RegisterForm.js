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
      <br />
      <br />
      <Col sm={5} />
      <Col sm={2}>
        <p align="left">สมัครสมาชิก | Register</p>
      </Col>
      <br />
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col sm={4} />
          <Col componentClass={ControlLabel} sm={1}>
            <p align="right">Username:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="user"
              type="text"
              component={FieldInput}
              placeholder="enter user"
            />
          </Col>
        </FormGroup>

        <br />
        <br />

        <FormGroup>
          <Col sm={4} />
          <Col componentClass={ControlLabel} sm={1}>
            <p align="right">Password:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="password"
              type="password"
              component={FieldInput}
              placeholder="enter password"
            />
          </Col>
        </FormGroup>

        <br />
        <br />

        <FormGroup>
          <Col sm={3} />
          <Col componentClass={ControlLabel} sm={2}>
            <p align="right">Confirm Password:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="confirmPassword"
              type="password"
              component={FieldInput}
              placeholder="enter confirm password"
            />
          </Col>
        </FormGroup>

        <br />
        <br />

        <FormGroup>
          <Col sm={4} />
          <Col componentClass={ControlLabel} sm={1}>
            <p align="right">Email:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="email"
              type="email"
              component={FieldInput}
              placeholder="enter email"
            />
          </Col>
        </FormGroup>

        <br />

        <FormGroup>
          <Col sm={4} />
          <Col sm={4}>
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

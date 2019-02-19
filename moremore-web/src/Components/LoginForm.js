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
import { Link } from "react-router-dom";

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
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col sm={4} />
          <Col sm={1} componentClass={ControlLabel}>
            <p align="right">Email:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="email"
              type="email"
              component={FieldInput}
              placeholder="email"
            />
          </Col>
        </FormGroup>

        <br />
        <br />

        <FormGroup>
          <Col sm={4} />
          <Col sm={1} componentClass={ControlLabel}>
            <p align="right">Password:</p>
          </Col>
          <Col sm={3}>
            <Field
              name="password"
              type="password"
              component={FieldInput}
              placeholder="Password"
            />
          </Col>
        </FormGroup>

        <br />
        <br />

        <FormGroup>
          <Col sm={3} />
          <Col sm={5}>
            <Button type="submit">Sign in</Button>
            <br />
            <Link to="/ForgotPassword">ลืมรหัสผ่าน</Link>
          </Col>
        </FormGroup>
        <br />
        <br />
        <p>{props.message}</p>
      </Form>
    </div>
  );
};

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;

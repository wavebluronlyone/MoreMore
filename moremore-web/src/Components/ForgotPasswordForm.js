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

let ForgotPasswordForm = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={1}>
            Email:
          </Col>
          <Col sm={5}>
            <Field
              name="email"
              type="email"
              component={FieldInput}
              placeholder="email"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

ForgotPasswordForm = reduxForm({
  form: "forgotPassword"
})(ForgotPasswordForm);

export default ForgotPasswordForm;

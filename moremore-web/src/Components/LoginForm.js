import React from "react";
import { Form, Input, Button, Grid, Responsive } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

const FieldInput = ({ type, placeholder, input, label }) => {
  return (
    <div>
      <Form.Field>
        <label>{label}</label>
        <Input
          style={{
            width: "22em",
            borderColor: "#ffc900"
          }}
          type={type}
          placeholder={placeholder}
          value={input.value}
          onChange={input.onChange}
        />
      </Form.Field>
    </div>
  );
};

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <div style={{ fontFamily: "Prompt" }}>
      <Responsive maxWidth={800}>
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <Grid.Column mobile={1} tablet={4} />
            <Grid.Column>
              <Form.Group>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  component={FieldInput}
                  placeholder="email"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={FieldInput}
                  placeholder="password"
                />
              </Form.Group>
            </Grid.Column>
          </Grid>
          <br />
          <Link to="/ForgotPassword">
            <p align="center" style={{ color: "#ff9000" }}>
              ลืมรหัสผ่าน?
            </p>
          </Link>
          <br />
          <div align="center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#fbb900",
                color: "white"
              }}
            >
              Sign in
            </Button>
          </div>
        </Form>
      </Responsive>

      <Responsive minWidth={801}>
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={6} />
              <Grid.Column width={9}>
                <Form.Group>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    component={FieldInput}
                    placeholder="email"
                  />
                </Form.Group>
              </Grid.Column>

              <Grid.Column width={6} />
              <Grid.Column width={9}>
                <Form.Group>
                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    component={FieldInput}
                    placeholder="password"
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <Link to="/ForgotPassword">
            <p align="center" style={{ color: "#ff9000" }}>
              ลืมรหัสผ่าน?
            </p>
          </Link>
          <br />
          <div align="center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#fbb900",
                color: "white"
              }}
            >
              Sign in
            </Button>
          </div>
        </Form>
      </Responsive>
    </div>
  );
};

LoginForm = reduxForm({
  form: "login"
})(LoginForm);

export default LoginForm;

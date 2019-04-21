import React from "react";
import { Field, reduxForm } from "redux-form";
import {
  Form,
  Input,
  Button,
  Grid,
  Responsive,
  GridColumn
} from "semantic-ui-react";

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

let RegisterForm = props => {
  const { handleSubmit } = props;
  return (
    <div style={{ fontFamily: "Prompt" }}>
      <Responsive maxWidth={800}>
        <br />
        <h1 style={{ fontFamily: "Prompt" }} align="center">
          สมัครสมาชิก | Register
        </h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <GridColumn mobile={1} tablet={4} />
            <Grid.Column>
              <Form.Group>
                <Field
                  label="Username"
                  name="user"
                  type="text"
                  component={FieldInput}
                  placeholder="enter user"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={FieldInput}
                  placeholder="enter password"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  component={FieldInput}
                  placeholder="enter password"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  component={FieldInput}
                  placeholder="enter confirm password"
                />
              </Form.Group>
              <br />
              <Form.Group>
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  component={FieldInput}
                  placeholder="enter email"
                />
              </Form.Group>
            </Grid.Column>
          </Grid>
          <br />
          <div align="center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#feb955",
                color: "white"
              }}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </Responsive>

      <Responsive minWidth={801}>
        <h1 style={{ fontFamily: "Prompt" }} align="center">
          สมัครสมาชิก | Register
        </h1>
        <br />
        <Form onSubmit={handleSubmit}>
          <Grid stackable>
            <Grid.Row>
              <Grid.Column width={6} />
              <Grid.Column width={9}>
                <Form.Group>
                  <Field
                    label="Username"
                    name="user"
                    type="text"
                    component={FieldInput}
                    placeholder="enter user"
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
                    placeholder="enter password"
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={6} />
              <Grid.Column width={9}>
                <Form.Group>
                  <Field
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    component={FieldInput}
                    placeholder="enter confirm password"
                  />
                </Form.Group>
              </Grid.Column>
              <Grid.Column width={6} />
              <Grid.Column width={9}>
                <Form.Group>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    component={FieldInput}
                    placeholder="enter email"
                  />
                </Form.Group>
              </Grid.Column>
            </Grid.Row>
          </Grid>
          <br />
          <div align="center">
            <Button
              type="submit"
              style={{
                backgroundColor: "#feb955",
                color: "white"
              }}
            >
              Sign up
            </Button>
          </div>
        </Form>
      </Responsive>
    </div>
  );
};

RegisterForm = reduxForm({
  form: "register"
})(RegisterForm);

export default RegisterForm;

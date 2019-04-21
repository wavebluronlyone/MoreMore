import React from "react";
import { Form, Input, Button, Grid, Responsive } from "semantic-ui-react";
import { Field, reduxForm } from "redux-form";

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

let ForgotPasswordForm = props => {
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
              Submit
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
              Submit
            </Button>
          </div>
        </Form>
      </Responsive>
    </div>
  );
};

ForgotPasswordForm = reduxForm({
  form: "forgotPassword"
})(ForgotPasswordForm);

export default ForgotPasswordForm;

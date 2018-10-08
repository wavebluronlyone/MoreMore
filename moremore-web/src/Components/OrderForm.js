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

let OrderForm = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Card Number:
          </Col>
          <Col sm={10}>
            <Field
              name="cardNumber"
              type="text"
              component={FieldInput}
              placeholder="enter cardNumber"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Name on card:
          </Col>
          <Col sm={10}>
            <Field
              name="nameOnCard"
              type="text"
              component={FieldInput}
              placeholder="enter nameOnCard"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Expiry date:
          </Col>
          <Col sm={10}>
            <Field
              name="expiryDate"
              type="text"
              component={FieldInput}
              placeholder="enter expiryDate"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Security code:
          </Col>
          <Col sm={10}>
            <Field
              name="securityCode"
              type="text"
              component={FieldInput}
              placeholder="enter securityCode"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button type="submit">Pay {props.price} baht</Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

OrderForm = reduxForm({
  form: "order"
})(OrderForm);

export default OrderForm;

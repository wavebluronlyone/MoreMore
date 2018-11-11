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
import { isEdit } from "../Actions/AdminAction";
import { connect } from "react-redux";

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

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  isEdit: (boolean, name) => {
    dispatch(isEdit(boolean, name));
  }
});

let EditProductForm = props => {
  const { handleSubmit } = props;
  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            ราคา:
          </Col>
          <Col sm={10}>
            <Field
              name="sheetPrice"
              type="text"
              component={FieldInput}
              placeholder="กรุณากรอกราคา"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            รายละเอียดสินค้าโดยย่อ:
          </Col>
          <Col sm={10}>
            <Field
              name="sheetHiLight"
              type="text"
              component="textarea"
              placeholder="กรุณากรอกรายละเอียดสินค้าโดยย่อ"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            รายละเอียดสินค้าโดยละเอียด:
          </Col>
          <Col sm={10}>
            <Field
              name="sheetProductDescription"
              type="text"
              component="textarea"
              placeholder="กรุณากรอกรายละเอียดสินค้า"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            ผู้อัพโหลด:
          </Col>
          <Col sm={10}>
            <Field
              name="sheetProfile"
              type="text"
              component={FieldInput}
              placeholder="กรุณากรอกผู้อัพโหลด"
            />
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <br />
            <Button
              onClick={() => {
                props.isEdit(false, "");
              }}
              type="submit"
            >
              ย้อนกลับ
            </Button>
            <Button onclick="" type="submit">
              แก้ไข
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
  );
};

EditProductForm = reduxForm({
  form: "editProduct"
})(EditProductForm);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(EditProductForm);

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
import { isEdit } from "../Actions/AdminActions";
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
            <p align="right">ราคา:</p>
          </Col>
          <Col sm={5}>
            <Field
              name="sheetPrice"
              type="text"
              component={FieldInput}
              placeholder="กรุณากรอกราคา"
            />
          </Col>
        </FormGroup>
        <br />
        <br />

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <p align="right">รายละเอียดสินค้าโดยย่อ:</p>
          </Col>
          <Col sm={5}>
            <Field
              name="sheetHiLight"
              type="text"
              component="textarea"
              rows={3}
              cols={80}
              placeholder="กรุณากรอกรายละเอียดสินค้าโดยย่อ"
            />
          </Col>
        </FormGroup>

        <br />
        <br />
        <br />
        <br />

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <p align="right">รายละเอียดสินค้าโดยละเอียด:</p>
          </Col>
          <Col sm={5}>
            <Field
              name="sheetProductDescription"
              type="text"
              component="textarea"
              rows={3}
              cols={80}
              placeholder="กรุณากรอกรายละเอียดสินค้า"
            />
          </Col>
        </FormGroup>

        <br />
        <br />
        <br />
        <br />

        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <p align="right">ผู้อัพโหลด:</p>
          </Col>
          <Col sm={5}>
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

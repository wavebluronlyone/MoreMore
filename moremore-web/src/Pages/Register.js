import React from "react";
import {
  Button,
  Form,
  FormGroup,
  Col,
  ControlLabel,
  FormControl,
  Radio,
  Checkbox
} from "react-bootstrap";

const Register = () => (
  <div>
    <br />
    <br />
    <br />
    <p align="left">สมัครสมาชิก | Register</p>
    <br />
    <Form horizontal>
      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Username: *
        </Col>
        <Col sm={10}>
          <FormControl type="email" placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Password: *
        </Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Confirm Password: *
        </Col>
        <Col sm={10}>
          <FormControl type="password" placeholder="Password" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          Email: *
        </Col>
        <Col sm={10}>
          <FormControl placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          ชื่อ-สกุล: *
        </Col>
        <Col sm={10}>
          <FormControl placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          ชั้นปี: *
        </Col>
        <Radio name="radioGroup" inline>
          1
        </Radio>
        <Radio name="radioGroup" inline>
          2
        </Radio>
        <Radio name="radioGroup" inline>
          3
        </Radio>
        <Radio name="radioGroup" inline>
          4
        </Radio>
        <Radio name="radioGroup" inline>
          อื่นๆ
        </Radio>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          เบอร์โทรศัพท์: *
        </Col>
        <Col sm={10}>
          <FormControl placeholder="Email" />
        </Col>
      </FormGroup>

      <FormGroup>
        <Col componentClass={ControlLabel} sm={2}>
          คุณรู้จัก TU more sheet จากที่ใด:
        </Col>
        <Checkbox>จากเพื่อนๆหรือคนรู้จัก</Checkbox>
        <Checkbox>จากรุ่นพี่แนะนำมา</Checkbox>
        <Checkbox>ป้ายโฆษณา</Checkbox>
        <Checkbox>facebook</Checkbox>
        <Checkbox>อื่นๆ</Checkbox>
      </FormGroup>

      <FormGroup>
        <Col smOffset={2} sm={10}>
          <Button type="submit">Sign up</Button>
        </Col>
      </FormGroup>
    </Form>
  </div>
);

export default Register;

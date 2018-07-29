import React from "react";
import { Grid, Row, Col, Image, Button } from "react-bootstrap";
import TableView from "../Components/TableView";

const Profile = () => (
  <div className="container">
    <br />
    <br />
    <br />
    <h1 align="left"> My Profile</h1><br/>
    <Grid>
      <Row>
        <Col sm={6}>
          <Image
            width="150px"
            height="150px"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb0aOnZ2nFpJXZoH3-EPTHLUWhielLC6RHkJpTkdIBJW0B-8iX"
            circle
          />
          <br />
          <br />
          <p align="center">แก้ไขข้อมูล</p>
        </Col>
        <Col sm={2}>
          <p align="left">Hello,</p>
          <h1 align="left">USERNAME</h1>
          <br />
          <p align="left"> จำนวน coin ที่คงเหลือ </p>
          <h1 align="left"> 200 Baht </h1>
          <br />
          <Button>เติม coin เพิ่ม</Button>
        </Col>
      </Row>
      <br />
      <hr/>
      <h1 align="left"> My library </h1>
      <br />
      <TableView/>
    </Grid>
  </div>
);

export default Profile;

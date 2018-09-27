import React from "react";
import {
  Grid,
  Row,
  Col,
  FormControl,
  Button
} from "react-bootstrap";

const Search = (props) => (
  <div className="container">
    <Grid>
      <Row>
        <Col sm={2} />
        <Col sm={6}>
        <FormControl type="email" placeholder="รหัสวิชา/ชื่อผู้เขียน" />
        </Col>
        <Col sm={1}>
        <Button type="submit">ค้นหา</Button>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default Search;

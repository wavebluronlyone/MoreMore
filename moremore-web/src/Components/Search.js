import React from "react";
import {
  Grid,
  Row,
  Col,
  FormControl,
  Button
} from "react-bootstrap";
import FaSearch from "react-icons/lib/fa/search";

const Search = (props) => (
  <div className="container">
    <Grid>
      <Row>
        <Col sm={2} />
        <Col sm={5}>
        <FormControl type="email" placeholder="รหัสวิชา/ชื่อผู้เขียน" />
        </Col>
        <Col sm={1}>
          <FaSearch/>
        </Col>
      </Row>
    </Grid>
    <br/>
    <Button type="submit">ค้นหา</Button>
  </div>
);

export default Search;

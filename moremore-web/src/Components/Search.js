import React from "react";
import {
  ButtonToolbar,
  DropdownButton,
  MenuItem,
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
        <Col sm={2}>
          <ButtonToolbar>
            <DropdownButton
              title="มหาวิทยาลัย"
              id="dropdown-size-large"
            >
              <MenuItem eventKey="1">Action</MenuItem>
              <MenuItem eventKey="2">Another action</MenuItem>
              <MenuItem eventKey="3">Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey="4">Separated link</MenuItem>
            </DropdownButton>
          </ButtonToolbar>
        </Col>
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

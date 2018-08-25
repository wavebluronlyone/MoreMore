import React from "react";
import { Grid, Row, Col, Pagination } from "react-bootstrap";
import CardView from "../Components/CardView";

let active = 7;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item active={number === active}>{number}</Pagination.Item>
  );
}

const Shop = () => (
  <div>
    <br />
    <br />
    <br />
    <br />
    <Grid>
      <Row>
        <Col sm={3}>
          <p>ผลการค้นหา (105 รายการ)</p>
        </Col>
        <Col sm={2}>
          <p>Sort by</p>
        </Col>
        <Col sm={2}>
          <p>Show</p>
        </Col>
      </Row>
    </Grid>
    <CardView />
    <CardView />
    <Pagination bsSize="small">{items}</Pagination>
  </div>
);

export default Shop;

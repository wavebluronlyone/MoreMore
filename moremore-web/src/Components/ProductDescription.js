import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import { connect } from "react-redux";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const ProductDescription = (props) => (
  <div>
    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
      <Tab eventKey={1} title="รายละเอียดสินค้า">
        <Row>
          <Col sm={2} />
          <Col>
            <p align="left">{props.detail}</p>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  </div>
);

export default connect(
  mapStatetoProps
)(ProductDescription);

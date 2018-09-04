import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";

const ProductDescription = () => (
  <div>
    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
      <Tab eventKey={1} title="รายละเอียดสินค้า">
        <Row>
          <Col sm={2} />
          <Col>
            <p align="left">Tab 1 content</p>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  </div>
);

export default ProductDescription;

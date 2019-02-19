import React from "react";
import { Col, Row, Tabs, Tab } from "react-bootstrap";

const SheetDescription = props => (
  <div>
    <Tabs defaultActiveKey={1} animation={false} id="noanim-tab-example">
      <Tab eventKey={1} title="รายละเอียดของชีท">
        <Row>
          <Col sm={2} />
          <Col>
            <p align="left">{props.sheetDetail}</p>
          </Col>
        </Row>
      </Tab>
    </Tabs>
  </div>
);

export default SheetDescription;

import React from "react";
import { Col,Row,Image,Button } from "react-bootstrap";
import ProductDescription from "../Components/ProductDescription";

const DetailProduct = () => (
  <div>
    <br />
    <br />
    <br />
    <Row>
      <Col sm={2} />
      <Col sm={2}>
        <p align="left">TU100</p>
        <Image
          align="left"
          height="300px"
          width="300px"
          src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
        />
      </Col>
      <Col sm={5}>
      <br/>
      <br/>
        <h2>20 บาท</h2>
        <a href="Buy"><Button>Buy</Button></a>
      </Col>
    </Row>
    <br/>
    <ProductDescription/>
  </div>
);

export default DetailProduct;

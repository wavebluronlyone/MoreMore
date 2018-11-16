import React from "react";
import { Card, CardImg, CardTitle, CardBody, CardText } from "reactstrap";
import { Grid, Row, Col } from "react-bootstrap";

const OrderHistory = props => (
  <div className="container">
    {props.list.data.map(res => {
      return <p>{res.profile}</p>;
    })}
  </div>
);

export default OrderHistory;

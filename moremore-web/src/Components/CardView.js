import React from "react";
import { Card, CardImg, CardTitle, CardText, CardBody } from "reactstrap";
import { Grid, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const CardView = props => (
  <div className="container">
    <Grid>
      <Row>
        {props.sheetData.data.map(res => {
          return (
            <Col sm={3}>
              <Card>
                <CardImg top width="100%" src={res.img} />
                <CardBody>
                  <CardTitle align="left">
                    <Link to={"/DetailProduct/" + res.name}>{res.name}</Link>
                  </CardTitle>
                  <CardText align="left">
                    <p>{res.hiLight}</p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Grid>
  </div>
);

export default CardView;

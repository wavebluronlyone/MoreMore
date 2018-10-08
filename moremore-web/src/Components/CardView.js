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
            <Col sm={4}>
              <Card>
                <CardImg
                  top
                  width="100%"
                  src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                  alt="Card image cap"
                />
                <CardBody>
                  <CardTitle align="left">
                    <Link to={"/DetailProduct/" + res.name}>{res.name}</Link>
                  </CardTitle>
                  <CardText align="left">
                    <p>{res.short_description}</p>
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

import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody
} from "reactstrap";
import { Grid, Row, Col, Image, Button } from "react-bootstrap";

const data = [
  {
    name: "TU100",
    shop: "ABC",
    description: "This is a description I",
    photo:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  },
  {
    name: "TU101",
    shop: "DEF",
    description: "This is a description II",
    photo:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  },
  {
    name: "TU102",
    shop: "OEC",
    description: "This is a description III",
    photo:
      "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
  }
];

const CardView = () => (
  <div className="container">
    <Grid>
      <Row>
        {data.map(res => {
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
                    <a href="DetailProduct">{res.name}</a>
                  </CardTitle>
                  <CardSubtitle align="left">
                    <Col sm={1}>
                      <Image
                        height="30px"
                        width="30px"
                        src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
                        circle
                      />
                    </Col>
                    <Col sm={5}>
                      <br />
                      <p>
                        &nbsp;&nbsp;
                        {res.shop}      
                      </p>
                    </Col>
                  </CardSubtitle>
                  <CardText align="left">
                    <br />
                    <br />
                    <p>{res.description}</p>        
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

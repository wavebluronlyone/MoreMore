import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  CardBody
} from "reactstrap";
import { Grid, Row, Col, Image } from "react-bootstrap";

const CardView = () => (
  <div className="container">
    <br />
    <Grid>
      <Row>
        <Col sm={4}>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle align="left">TU100</CardTitle>
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
                <br/>
                <p>&nbsp;&nbsp;Hello</p>
                </Col>
              </CardSubtitle>
              <CardText align="left">
              <br/><br/>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </CardText>
              <Button>Buy</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle align="left">TU120</CardTitle>
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
                <br/>
                <p>&nbsp;&nbsp;Hello</p>
                </Col>
              </CardSubtitle>
              <CardText align="left">
              <br/><br/>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </CardText>
              <Button>Buy</Button>
            </CardBody>
          </Card>
        </Col>
        <Col sm={4}>
          <Card>
            <CardImg
              top
              width="100%"
              src="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180"
              alt="Card image cap"
            />
            <CardBody>
              <CardTitle align="left">AT129</CardTitle>
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
                <br/>
                <p>&nbsp;&nbsp;Hello</p>
                </Col>
              </CardSubtitle>
              <CardText align="left">
              <br/><br/>
                <p>
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
              </CardText>
              <Button>Buy</Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Grid>
  </div>
);

export default CardView;

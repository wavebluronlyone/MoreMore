import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardText,
  CardBody
} from "reactstrap";
import { Grid, Row, Col, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { getStock } from "../Actions/StockActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  getStock: () => {
    dispatch(getStock());
  }
});

class CardView extends Component {
  componentDidMount() {
    this.props.getStock();
  }
  render() {
    return (
      <div className="container">
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
                  <CardTitle align="left">
                    <a href="DetailProduct">{this.props.stock.name}</a>
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
                        {this.props.stock.is_Admin}
                      </p>
                    </Col>
                  </CardSubtitle>
                  <CardText align="left">
                    <br />
                    <br />
                    <p>{}</p>
                    <p>{}</p>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(CardView);

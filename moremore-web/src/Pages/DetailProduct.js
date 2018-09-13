import React, { Component } from "react";
import { Col, Row, Image, Button } from "react-bootstrap";
import ProductDescription from "../Components/ProductDescription";
import Navigationbar from "../Components/Navigationbar";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class DetailProduct extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    return (
      <div>
        {this.props.user.isLoggedIn === true ? (
          <Navigationbar show={true} />
        ) : (
          <Navigationbar show={false} />
        )}
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
            <br />
            <br />
            <h2>20 บาท</h2>
            <Button>Buy</Button>
          </Col>
        </Row>
        <br />
        <ProductDescription />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(DetailProduct);

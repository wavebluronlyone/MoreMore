import React, { Component } from "react";
import { Col, Row, Image } from "react-bootstrap";
import ProductDescription from "../Components/ProductDescription";
import Navigationbar from "../Components/Navigationbar";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import { findDataWithNameOfProduct } from "../Actions/StockActions";
import { Link } from "react-router-dom";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  findDataWithNameOfProduct: name => {
    dispatch(findDataWithNameOfProduct(name));
  }
});

class DetailProduct extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
    this.props.findDataWithNameOfProduct(this.props.match.params.id);
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
            <p align="left">{this.props.match.params.id}</p>
            <Image
              align="left"
              height="300px"
              width="300px"
              src={this.props.stock.img}
            />
          </Col>
          <Col sm={5}>
            <br />
            <br />
            <h2>{this.props.stock.price + " บาท"}</h2>
            <Link to={"/Buy/" + this.props.match.params.id}>Buy</Link>
          </Col>
        </Row>
        <br />
        <ProductDescription detail={this.props.stock.longDetail} />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(DetailProduct);

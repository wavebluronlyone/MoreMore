import React, { Component } from "react";
import { Col, Row, Button } from "react-bootstrap";
import SheetDescription from "../Components/SheetDescription";
import Navigationbar from "../Components/Navigationbar";
import { connect } from "react-redux";
import {
  findSheetDataWithSheetName,
  addSheetToCart,
  createSlideImage,
  resetImage
} from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import Slide from "../Components/Slide";

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
  findSheetDataWithSheetName: sheetName => {
    dispatch(findSheetDataWithSheetName(sheetName));
  },
  addSheetToCart: (sheetName, sheetPrice, sheetAddCart) => {
    dispatch(addSheetToCart(sheetName, sheetPrice, sheetAddCart));
  },
  createSlideImage: sheetName => {
    dispatch(createSlideImage(sheetName));
  },
  resetImage: () => {
    dispatch(resetImage());
  }
});

class DetailSheet extends Component {
  componentWillMount() {
    this.props.isLoggedIn();
    this.props.findSheetDataWithSheetName(this.props.match.params.id);
    this.props.createSlideImage(this.props.match.params.id);
  }
  componentWillUnmount() {
    this.props.resetImage();
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
        <p>{this.props.stock.message}</p>
        {this.props.stock.price !== 0 ? (
          <div>
            <Row>
              <Col sm={2} />
              <Col sm={2}>
                <p align="left">{this.props.match.params.id}</p>
                <Slide multipleImageList={this.props.stock.subImg} />
              </Col>
              <Col sm={5}>
                <br />
                <br />
                <h2>{this.props.stock.price + " บาท"}</h2>
                <Button
                  onClick={() => {
                    this.props.addSheetToCart(
                      this.props.match.params.id,
                      this.props.stock.price,
                      this.props.stock.addCart
                    );
                  }}
                >
                  เพิ่มสินค้าลงในตะกร้า
                </Button>
              </Col>
            </Row>
            <br />
            <SheetDescription sheetDetail={this.props.stock.longDetail} />
          </div>
        ) : (
          <p>กรุณารอสักครู่...</p>
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(DetailSheet);

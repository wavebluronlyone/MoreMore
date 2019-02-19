import React, { Component } from "react";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
import {
  removeSheetCart,
  createLinePayment,
  linkPayment
} from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import { Col, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  removeSheetCart: (sheetName, sheetAddCart) => {
    dispatch(removeSheetCart(sheetName, sheetAddCart));
  },
  createLinePayment: totalSheetPrices => {
    dispatch(createLinePayment(totalSheetPrices));
  }
});

class Cart extends Component {
  componentWillMount() {
    this.props.isLoggedIn();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.stock.transactionId !== nextProps.stock.transactionId) {
      linkPayment(
        this.props.stock.addCart,
        nextProps.stock.url,
        nextProps.stock.transactionId,
        nextProps.stock.orderId,
        nextProps.stock.price,
        this.props.user.email
      );
    }
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
        {this.props.stock.totalPrices === 0 ? (
          <p>{"คุณยังไม่ได้เลือกสินค้า"}</p>
        ) : (
          <div>
            <Row>
              <Col sm={2} />
              <Col sm={4}>
                <p align="left">Order Summary</p>
                {this.props.stock.addCart.map(sheet => {
                  return (
                    <p align="left">
                      {" " + sheet.name + " " + sheet.price + " บาท "}
                      <a
                        onClick={() => {
                          this.props.removeSheetCart(
                            sheet,
                            this.props.stock.addCart,
                            this.props.stock.arrPrices
                          );
                        }}
                      >
                        ลบ
                      </a>
                    </p>
                  );
                })}
                <p align="left"> ค่าธรรมเนียม &nbsp;&nbsp;&nbsp; 5 บาท</p>
                <p align="left">
                  {" "}
                  รวม &nbsp;&nbsp;&nbsp; {this.props.stock.totalPrices + 5} บาท
                </p>
                <br />
                <br />
                <p align="left">เลือกการชำระเงิน</p>
                <p align="left">Line Pay</p>
                <br />
                {this.props.user.isLoggedIn === true ? (
                  <Button
                    onClick={() => {
                      this.props.createLinePayment(
                        this.props.stock.totalPrices + 5
                      );
                    }}
                  >
                    ยืนยัน
                  </Button>
                ) : (
                  <Link to="/Login">ยืนยัน</Link>
                )}
              </Col>
            </Row>
          </div>
        )}
        <p>{this.props.stock.message}</p>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Cart);

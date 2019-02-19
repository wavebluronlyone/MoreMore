import React, { Component } from "react";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
import { createSheetforUser, resetPayment } from "../Actions/StockActions";
import { isLoggedIn, getSheetDataFromAddCart } from "../Actions/UserActions";

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
  getSheetDataFromAddCart: (email, transactionId) => {
    dispatch(getSheetDataFromAddCart(email, transactionId));
  },
  resetPayment: () => {
    dispatch(resetPayment());
  }
});

class BuyComplete extends Component {
  componentWillMount() {
    this.props.isLoggedIn();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user.email !== nextProps.user.email) {
      this.props.getSheetDataFromAddCart(
        nextProps.user.email,
        this.props.location.search
      );
    }
    if (this.props.user.addCart.length < nextProps.user.addCart.length) {
      let sheetDataAddCartSize = nextProps.user.addCart.length;
      for (let i = 0; i < sheetDataAddCartSize; i++) {
        createSheetforUser(
          nextProps.user.email,
          nextProps.user.addCart[i].name
        );
      }
    }
  }
  componentWillUnmount() {
    this.props.resetPayment();
  }
  render() {
    return (
      <div>
        {this.props.user.isLoggedIn === true ? (
          <div>
            <Navigationbar show={true} />
            <br />
            <br />
            <p>การซื้อสินค้าเสร็จสิ้น กรุณาตรวจสอบได้ที่ profile</p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(BuyComplete);

import React, { Component } from "react";
import { connect } from "react-redux";
import { createSheetforUser, resetPayment } from "../Actions/StockActions";
import { isLoggedIn, getSheetDataFromAddCart } from "../Actions/UserActions";
import Login from "./Login";

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
  createSheetforUser: (email, sheetName) => {
    dispatch(createSheetforUser(email, sheetName));
  },
  resetPayment: () => {
    dispatch(resetPayment());
  }
});

class BuyComplete extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      this.props.getSheetDataFromAddCart(
        this.props.user.email,
        this.props.location.search
      );
    }
    if (this.props.user.addCart.length > prevProps.user.addCart.length) {
      let sheetDataAddCartSize = this.props.user.addCart.length;
      for (let i = 0; i < sheetDataAddCartSize; i++) {
        this.props.createSheetforUser(
          this.props.user.email,
          this.props.user.addCart[i].name
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
        {Boolean(localStorage.getItem("isloggedIn")) === true ? (
          <div>
            <br />
            <br />
            {this.props.stock.message !== "" ? (
              <p
                align="center"
                style={{ fontFamily: "Prompt", fontSize: "1.5em" }}
              >
                {this.props.stock.message}
              </p>
            ) : (
              <p
                align="center"
                style={{ fontFamily: "Prompt", fontSize: "1.5em" }}
              >
                กรุณารอสักครู่...
              </p>
            )}
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(BuyComplete);

import React, { Component } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class BuyCancel extends Component {
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
            <p
              align="center"
              style={{ fontFamily: "Prompt", fontSize: "1.5em" }}
            >
              การซื้อสินค้าไม่สำเร็จ
            </p>
          </div>
        ) : null}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(BuyCancel);

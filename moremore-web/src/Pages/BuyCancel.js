import React, { Component } from "react";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
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
  //   componentWillMount() {
  //     this.props.isLoggedIn();
  //     let arrSize = this.props.stock.addCart.length;
  //     for (let i = 0; i < arrSize; i++) {
  //       createSheetforUser(this.props.user.email, this.props.stock.addCart[i]);
  //     }
  //   }

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
            <p>การซื้อสินค้าไม่สำเร็จ</p>
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

import React, { Component } from "react";
import OrderForm from "../Components/OrderForm";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import { createCardWithToken } from "../Actions/StockActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Order extends Component {
  submit = values => {
    createCardWithToken(
      values.cardNumber,
      values.nameOnCard,
      values.expiryDate,
      values.securityCode,
      this.props.stock.price + 5
    );
  };
  render() {
    return (
      <div>
        <br />
        <br />
        <OrderForm price={this.props.stock.price + 5} onSubmit={this.submit} />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Order);

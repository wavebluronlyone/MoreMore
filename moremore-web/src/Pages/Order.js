import React, { Component } from "react";
import OrderForm from "../Components/OrderForm";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import { createCardWithToken } from "../Actions/StockActions";
import BuyComplete from "./BuyComplete";
import Navigationbar from "../Components/Navigationbar";

const mapStatetoProps = state => {
  return {
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  createCardWithToken: (
    cardNumber,
    nameOnCard,
    expiryDate,
    securityCode,
    totalPrice
  ) => {
    dispatch(
      createCardWithToken(
        cardNumber,
        nameOnCard,
        expiryDate,
        securityCode,
        totalPrice
      )
    );
  }
});

class Order extends Component {
  submit = values => {
    this.props.createCardWithToken(
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
        {this.props.stock.isPaid === false ? (
          <div>
            <Navigationbar show={true} />
            <OrderForm
              price={this.props.stock.price + 5}
              onSubmit={this.submit}
            />
          </div>
        ) : (
          <BuyComplete {...this.props} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Order);

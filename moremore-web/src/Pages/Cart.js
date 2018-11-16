import React, { Component } from "react";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
import { isLoggedIn } from "../Actions/UserActions";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Cart extends Component {
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
        <p align="left">รายชื่อสินค้าที่ถูกกด</p>
        {this.props.stock.addCart.map(res => {
          return <p>{res.name}</p>;
        })}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Cart);

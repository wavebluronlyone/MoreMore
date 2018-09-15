import React, { Component } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";
import {
  createSheetforUser,
  findPdfWithNameOfProduct
} from "../Actions/StockActions";

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
  findPdfWithNameOfProduct: name => {
    dispatch(findPdfWithNameOfProduct(name));
  }
});

class BuyComplete extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
    this.props.findPdfWithNameOfProduct(this.props.match.params.id);
  }
  render() {
    if (this.props.user.isLoggedIn == true) {
      createSheetforUser(
        this.props.user.email,
        this.props.match.params.id,
        this.props.stock.pdf
      );
    }
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

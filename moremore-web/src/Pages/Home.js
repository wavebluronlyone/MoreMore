import React, { Component } from "react";
import Search from "../Components/Search";
import Slide from "../Components/Slide";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { getBestSeller } from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  // getBestSeller: () => {
  //   dispatch(getBestSeller());
  // },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Home extends Component {
  // componentDidMount() {
  //   this.props.getBestSeller();
  // }
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
        <h1>หาตัวช่วยในการสอบของคุณได้ที่นี่</h1>
        <br />
        <Search />
        <br />
        <hr />
        <Slide />
        <hr />
        <br />
        <h1>Best Seller</h1>
        {/* <CardView sheetData={this.props.stock} /> */}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Home);

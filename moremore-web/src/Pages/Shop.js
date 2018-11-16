import React, { Component } from "react";
import { Grid, Row, Col, Pagination } from "react-bootstrap";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { getAllProduct } from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  getAllProduct: () => {
    dispatch(getAllProduct());
  },
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Shop extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
    this.props.getAllProduct();
    this.interval = setInterval(() => this.props.getAllProduct(), 20000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
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
        <br />
        <br />
        <br />
        <CardView list={this.props.stock} />
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Shop);

import React, { Component } from "react";
import Slide from "../Components/Slide";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import Navigationbar from "../Components/Navigationbar";
import SearchForm from "../Components/SearchForm";
import { getBestSeller, resetImage } from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import { Grid, Col, Row } from "react-bootstrap";

const mapStatetoProps = state => {
  return {
    stock: state.stock,
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  getBestSeller: () => {
    dispatch(getBestSeller());
  },
  resetImage: () => {
    dispatch(resetImage());
  }
});

class Home extends Component {
  componentWillMount() {
    this.props.isLoggedIn();
    this.props.getBestSeller();
  }
  componentWillUnmount() {
    this.props.resetImage();
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
        <p>{this.props.stock.message}</p>
        <h1>หาตัวช่วยในการสอบของคุณได้ที่นี่</h1>
        <br />
        <SearchForm />
        <br />
        <hr />
        {/* <Slide list={this.props.stock} /> */}
        <hr />
        <br />
        <h1>Best Seller</h1>
        <Grid>
          <Row>
            <Col sm={2} />
            <Col>
              <CardView sheetList={this.props.stock.bestSeller} />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Home);

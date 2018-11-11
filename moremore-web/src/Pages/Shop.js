import React, { Component } from "react";
import { Grid, Row, Col, Pagination } from "react-bootstrap";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import { getAllProduct, reset } from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";

let active = 7;
let items = [];
for (let number = 1; number <= 10; number++) {
  items.push(
    <Pagination.Item active={number === active}>{number}</Pagination.Item>
  );
}

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
  },
  reset: () => {
    dispatch(reset());
  }
});

class Shop extends Component {
  componentWillMount() {
    this.props.getAllProduct();
    this.props.reset();
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
        <Grid>
          <Row>
            <Col sm={3}>
              <p>ผลการค้นหา ({this.props.stock.data.length} รายการ)</p>
            </Col>
            <Col sm={2}>
              <p>Sort by</p>
            </Col>
            <Col sm={2}>
              <p>Show</p>
            </Col>
          </Row>
        </Grid>
        <CardView sheetData={this.props.stock} />
        <Pagination bsSize="small">{items}</Pagination>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Shop);

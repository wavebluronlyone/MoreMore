import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";
import Login from "../Pages/Login";
import { Link } from "react-router-dom";

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

class Buy extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    const total = this.props.stock.price + 5;
    return (
      <div>
        {this.props.user.isLoggedIn === true ? (
          <div>
            <Navigationbar show={true} />
            <br />
            <br />
            <Row>
              <Col sm={2} />
              <Col sm={2}>
                <p align="left">Order Summary</p>
                <p align="left">
                  {" "}
                  {this.props.match.params.id} &nbsp;&nbsp;&nbsp;{" "}
                  {this.props.stock.price} บาท
                </p>
                <p align="left"> ค่าธรรมเนียม &nbsp;&nbsp;&nbsp; 5 บาท</p>
                <p align="left"> รวม &nbsp;&nbsp;&nbsp; {total} บาท</p>
                <br />
                <br />
                <p align="left">เลือกการชำระเงิน</p>
                <p align="left">Credit Card</p>
                <br />
                <Link to={"/Order/" + this.props.match.params.id}>ยืนยัน</Link>
              </Col>
            </Row>
          </div>
        ) : (
          <Login />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Buy);

import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";
import Login from "../Pages/Login";

const mapStatetoProps = state => {
  return {
    user: state.user
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
                  {this.props.match.params.id} &nbsp;&nbsp;&nbsp; 20 บาท
                </p>
                <p align="left"> ค่าธรรมเนียม &nbsp;&nbsp;&nbsp; 5 บาท</p>
                <p align="left"> รวม &nbsp;&nbsp;&nbsp; {20 + 5} บาท</p>
                <br />
                <br />
                <p align="left">เลือกการชำระเงิน</p>
                <p align="left">Internet Banking</p>
                <br />
                <a href={"/BuyComplete/" + this.props.match.params.id}>
                  ยืนยัน
                </a>
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

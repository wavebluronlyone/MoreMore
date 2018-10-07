import React, { Component } from "react";
import { connect } from "react-redux";
import { isLoggedIn } from "../Actions/AdminAction";
import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
import { Login } from "../Pages";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import AddProductForm from "../AdminComponents/AddProductForm";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  }
});

class Admin extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }
  render() {
    return (
      <div>
        {this.props.admin.isLoggedIn === true ? (
          <div>
            <AdminNavigationbar />
            <br />
            <br />
            <Tabs
              defaultActiveKey={1}
              animation={false}
              id="noanim-tab-example"
            >
              <Tab eventKey={1} title="เพิ่มชีท">
                <Row>
                  <Col sm={2} />
                  <Col>
                  <AddProductForm onSubmit={this.submit} />
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={2} title="ดูชีท">
                <Row>
                  <Col sm={2} />
                  <Col>
                    <p align="left">watch</p>
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={3} title="ประวัติการสั่งซื้อ">
                <Row>
                  <Col sm={2} />
                  <Col>
                    <p align="left">history</p>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
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
)(Admin);
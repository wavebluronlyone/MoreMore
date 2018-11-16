import React, { Component } from "react";
import { connect } from "react-redux";
import {
  isAdminLoggedIn,
  createPdf,
  createImage,
  createProductText,
  isEdit,
  editProduct,
  getAllOrderFromProfile
} from "../Actions/AdminAction";
import { getAllProduct } from "../Actions/StockActions";
import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
import ShowAllProduct from "../AdminComponents/ShowAllProduct";
import { Login } from "../Pages";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import AddProductForm from "../AdminComponents/AddProductForm";
import EditProductForm from "../AdminComponents/EditProductForm";
import OrderHistory from "../AdminComponents/OrderHistory";

const mapStatetoProps = state => {
  return {
    admin: state.admin,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isAdminLoggedIn: () => {
    dispatch(isAdminLoggedIn());
  },
  getAllProduct: () => {
    dispatch(getAllProduct());
  },
  isEdit: (boolean, name) => {
    dispatch(isEdit(boolean, name));
  },
  getAllOrderFromProfile: () => {
    dispatch(getAllOrderFromProfile());
  },
  createPdf: (pdf, sheetName) => {
    dispatch(createPdf(pdf, sheetName));
  }
});

class Admin extends Component {
  componentDidMount() {
    this.props.isAdminLoggedIn();
    this.props.getAllProduct();
    this.props.getAllOrderFromProfile();

    this.interval = setInterval(() => this.props.getAllProduct(), 20000);
    this.interval2 = setInterval(
      () => this.props.getAllOrderFromProfile(),
      20000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
    clearInterval(this.interval2);
  }

  submit = values => {
    this.props.createPdf(values.sheetPdf[0], values.sheetName);
    createImage(values.sheetImage[0], values.sheetName);
    createProductText(
      values.sheetName,
      values.sheetPrice,
      values.sheetHiLight,
      values.sheetProductDescription,
      values.sheetProfile
    );
  };

  submit2 = values => {
    editProduct(
      this.props.admin.name,
      values.sheetPrice,
      values.sheetHiLight,
      values.sheetProductDescription,
      values.sheetProfile
    );
  };

  render() {
    return (
      <div>
        {this.props.admin.isLoggedIn === true ? (
          <div>
            <AdminNavigationbar />
            <br />
            <br />
            <p>{this.props.admin.message}</p>
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
                    {this.props.admin.isEdit === true ? (
                      <EditProductForm
                        name={this.props.admin.name}
                        onSubmit={this.submit2}
                      />
                    ) : (
                      <ShowAllProduct list={this.props.stock} />
                    )}
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={3} title="ประวัติการสั่งซื้อ">
                <Row>
                  <Col sm={2} />
                  <Col>
                    <OrderHistory list={this.props.admin} />
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

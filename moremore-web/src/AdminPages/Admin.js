import React, { Component } from "react";
import { connect } from "react-redux";
import {
  isLoggedIn,
  createPdf,
  createImage,
  createProductText,
  isEdit,
  editProduct
} from "../Actions/AdminAction";
import { getAllProduct } from "../Actions/StockActions";
import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
import ShowAllProduct from "../AdminComponents/ShowAllProduct";
import { Login } from "../Pages";
import { Col, Row, Tabs, Tab } from "react-bootstrap";
import AddProductForm from "../AdminComponents/AddProductForm";
import EditProductForm from "../AdminComponents/EditProductForm";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  getAllProduct: () => {
    dispatch(getAllProduct());
  },
  isEdit: (boolean, name) => {
    dispatch(isEdit(boolean, name));
  }
});

class Admin extends Component {
  componentDidMount() {
    this.props.isLoggedIn();
  }

  componentWillMount() {
    this.props.getAllProduct();
  }

  submit = values => {
    createPdf(values.sheetPdf[0], values.sheetName);
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
                      <ShowAllProduct list={this.props.admin} />
                    )}
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={3} title="ประวัติการสั่งซื้อ">
                <Row>
                  <Col sm={2} />
                  <Col>
                    <p align="left">{this.props.admin.pdf}</p>
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

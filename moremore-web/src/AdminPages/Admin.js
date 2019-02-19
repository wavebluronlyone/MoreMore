import React, { Component } from "react";
import { connect } from "react-redux";
import {
  isAdminLoggedIn,
  isEdit,
  editProduct,
  getAllOrderFromProfile,
  resetMessage
} from "../Actions/AdminActions";
import {
  findSheetDataWithPagination,
  findSheetDataWithPaginationFromSearch
} from "../Actions/StockActions";
import AdminNavigationbar from "../AdminComponents/AdminNavigationbar";
import ShowAllProduct from "../AdminComponents/ShowAllProduct";
import EditProductForm from "../AdminComponents/EditProductForm";
import SearchForm from "../Components/SearchForm";
import { Col, Row, Tabs, Tab, Button } from "react-bootstrap";
import Pagination from "react-js-pagination";
import DateTime from "react-datetime";
import { AdminLogin } from "../AdminPages";
import { CSVLink } from "react-csv";
import FaFacebook from "react-icons/lib/fa/facebook";
import "react-datetime/css/react-datetime.css";
import AddProduct from "../AdminComponents/AddProduct";

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
  findSheetDataWithPagination: (currentPage, limitPage) => {
    dispatch(findSheetDataWithPagination(currentPage, limitPage));
  },
  findSheetDataWithPaginationFromSearch: (currentPage, limitPage, input) => {
    dispatch(findSheetDataWithPaginationFromSearch(currentPage, limitPage, input));
  },
  isEdit: (boolean, name) => {
    dispatch(isEdit(boolean, name));
  },
  getAllOrderFromProfile: (month, year) => {
    dispatch(getAllOrderFromProfile(month, year));
  },
  resetMessage: () => {
    dispatch(resetMessage());
  }
});

const headers = [
  { label: "ชื่อชีท", key: "name" },
  { label: "ผู้จัดทำ", key: "profile" },
  { label: "ราคา", key: "price" },
  { label: "จำนวนคนซื้อ", key: "payment" }
];

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limitPage: 5,
      month: "",
      year: ""
    };
  }
  componentWillMount() {
    this.props.isAdminLoggedIn();
    this.props.findSheetDataWithPagination(
      this.state.activePage,
      this.state.limitPage
    );
  }
  componentWillUnmount() {
    this.props.resetMessage();
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.admin.email !== nextProps.admin.email) {
      this.props.findSheetDataWithPagination(
        this.state.activePage,
        this.state.limitPage
      );
      const date = new Date();
      const currentDate = date.toDateString().split(" ");
      this.setState({ month: currentDate[1], year: currentDate[3] });
      this.props.getAllOrderFromProfile(currentDate[1], currentDate[3]);
    }
  }

  submit = values => {
    editProduct(
      this.props.admin.name,
      values.sheetPrice,
      values.sheetHiLight,
      values.sheetProductDescription,
      values.sheetProfile
    );
  };

  handlePaginationChange(currentPage, limitPage, input) {
    this.setState({ activePage: currentPage });
    if (this.props.stock.isTyping === 0) {
      this.props.findSheetDataWithPagination(currentPage, limitPage);
    } else {
      this.props.findSheetDataWithPaginationFromSearch(currentPage, limitPage, input);
    }
  }

  handleDateChange(date) {
    const inputDate = date._d.toString().split(" ");
    this.setState({ month: inputDate[1], year: inputDate[3] });
    this.props.getAllOrderFromProfile(inputDate[1], inputDate[3]);
  }

  render() {
    return (
      <div>
        {this.props.admin.isLoggedIn === true ? (
          <div>
            <AdminNavigationbar />
            <br />
            <br />
            <p>{this.props.admin.messageAddProduct}</p>
            <Tabs
              defaultActiveKey={1}
              animation={false}
              id="noanim-tab-example"
            >
              <Tab eventKey={1} title="เพิ่มชีท">
                <Row>
                  <Col sm={2} />
                  <Col>
                    <AddProduct />
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
                        onSubmit={this.submit}
                      />
                    ) : (
                      <div>
                        <SearchForm />
                        <br />
                        <ShowAllProduct sheetList={this.props.stock} />
                        {this.props.stock.isTyping === 0 ? (
                          <div>
                            <Pagination
                              prevPageText="prev"
                              nextPageText="next"
                              firstPageText="first"
                              lastPageText="last"
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.limitPage}
                              totalItemsCount={this.props.stock.pageNumber}
                              pageRangeDisplayed={5}
                              onChange={currentPage => {
                                this.handlePaginationChange(
                                  currentPage,
                                  this.state.limitPage,
                                  this.props.stock.input
                                );
                              }}
                            />
                          </div>
                        ) : (
                          <div>
                            <Pagination
                              prevPageText="prev"
                              nextPageText="next"
                              firstPageText="first"
                              lastPageText="last"
                              activePage={this.state.activePage}
                              itemsCountPerPage={this.state.limitPage}
                              totalItemsCount={this.props.stock.pageNumber}
                              pageRangeDisplayed={5}
                              onChange={currentPage => {
                                this.handlePaginationChange(
                                  currentPage,
                                  this.state.limitPage,
                                  this.props.stock.input
                                );
                              }}
                            />
                          </div>
                        )}
                      </div>
                    )}
                  </Col>
                </Row>
              </Tab>
              <Tab eventKey={3} title="ประวัติการสั่งซื้อ">
                <Col sm={4} />
                <Col sm={3}>
                  <DateTime
                    inputProps={{ placeholder: "Enter your date" }}
                    onChange={date => {
                      this.handleDateChange(date);
                    }}
                  />
                </Col>
                <br />
                <br />
                <Row>
                  <Col sm={4} />
                  <Col sm={3}>
                    <CSVLink
                      data={this.props.admin.data}
                      headers={headers}
                      filename={
                        this.state.month + "-" + this.state.year + ".csv"
                      }
                    >
                      ดาวน์โหลดประวัติการสั่งซื้อของ {this.state.month}{" "}
                      {this.state.year}
                    </CSVLink>
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </div>
        ) : (
          <div>
            <br />
            <br />
            <br />
            <p align="center">ลงชื่อเข้าสู่ระบบ</p>
            <Button bsStyle="primary">
              <FaFacebook /> &nbsp;login with facebook
            </Button>
            <br />
            <br />
            <AdminLogin />
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Admin);

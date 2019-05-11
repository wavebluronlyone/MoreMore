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
import ShowAllProduct from "../AdminComponents/ShowAllProduct";
import EditProductForm from "../AdminComponents/EditProductForm";
import SearchForm from "../Components/SearchForm";
import Pagination from "react-js-pagination";
import DateTime from "react-datetime";
import { AdminLogin } from "../AdminPages";
import { CSVLink } from "react-csv";
import "react-datetime/css/react-datetime.css";
import AddProduct from "../AdminComponents/AddProduct";
import { Segment, Tab, Container, Message, Progress } from "semantic-ui-react";

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
    dispatch(
      findSheetDataWithPaginationFromSearch(currentPage, limitPage, input)
    );
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
  componentDidMount() {
    this.props.isAdminLoggedIn();
    this.props.findSheetDataWithPagination(
      this.state.activePage,
      this.state.limitPage
    );
  }
  componentWillUnmount() {
    this.props.resetMessage();
  }
  componentDidUpdate(prevProps) {
    if (this.props.admin.email !== prevProps.admin.email) {
      this.props.findSheetDataWithPagination(
        this.state.activePage,
        this.state.limitPage
      );
      const date = new Date();
      const currentDate = date.toDateString().split(" ");
      this.setState({ month: currentDate[1], year: currentDate[3] });
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
      this.props.findSheetDataWithPaginationFromSearch(
        currentPage,
        limitPage,
        input
      );
    }
  }

  handleDateChange(date) {
    const inputDate = date._d.toString().split(" ");
    this.setState({ month: inputDate[1], year: inputDate[3] });
    this.props.getAllOrderFromProfile(inputDate[1], inputDate[3]);
  }

  handleTabChange = (e, data) => {
    if (data.activeIndex === 2) {
      const date = new Date();
      const currentDate = date.toDateString().split(" ");
      this.setState({ month: currentDate[1], year: currentDate[3] });
      this.props.getAllOrderFromProfile(currentDate[1], currentDate[3]);
    }
  };

  render() {
    return (
      <Segment
        style={{
          minHeight: "38em"
        }}
      >
        {this.props.admin.isLoggedIn === true ? (
          <Container style={{ fontFamily: "Prompt" }}>
            <br />
            {this.props.admin.uploadPdf > 0 ? (
              <div style={{ fontFamily: "Prompt" }}>
                <p>กำลังอัพโหลด PDF</p>
                <Progress percent={this.props.admin.uploadPdf} color="green" />
              </div>
            ) : null}
            {this.props.admin.uploadImage > 0 ? (
              <div style={{ fontFamily: "Prompt" }}>
                <p>กำลังอัพโหลดรูปภาพหน้าปก</p>
                <Progress
                  percent={this.props.admin.uploadImage}
                  color="green"
                />
              </div>
            ) : null}
            {this.props.admin.messageAddProduct !== "" ? (
              <Message positive>
                <p style={{ fontFamily: "Prompt" }}>
                  {this.props.admin.messageAddProduct}
                </p>
              </Message>
            ) : null}
            <Tab
              onTabChange={this.handleTabChange}
              panes={[
                {
                  menuItem: "เพิ่มชีท",
                  render: () => (
                    <Tab.Pane>
                      <AddProduct />
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: "ดูชีท",
                  render: () => (
                    <Tab.Pane>
                      {this.props.admin.isEdit === true ? (
                        <EditProductForm
                          name={this.props.admin.name}
                          onSubmit={this.submit}
                        />
                      ) : (
                        <div align="center">
                          <br />
                          <SearchForm />
                          <br />
                          <ShowAllProduct sheetList={this.props.stock} />
                          {this.props.stock.isTyping === 0 ? (
                            <div align="center">
                              <br />
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
                              <br />
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
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: "ประวัติการสั่งซื้อ",
                  render: () => (
                    <Tab.Pane>
                      <DateTime
                        inputProps={{ placeholder: "Enter your date" }}
                        onChange={date => {
                          this.handleDateChange(date);
                        }}
                      />
                      <br />
                      Loaded: {this.props.admin.data.length}/
                      {this.props.admin.sheetCount}
                      <br />
                      {this.props.admin.data.length ===
                      this.props.admin.sheetCount ? (
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
                      ) : null}
                    </Tab.Pane>
                  )
                }
              ]}
            />
          </Container>
        ) : (
          <div>
            <AdminLogin />
          </div>
        )}
      </Segment>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Admin);

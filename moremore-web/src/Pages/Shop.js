import React, { Component } from "react";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import {
  resetImage,
  findSheetDataWithPagination,
  findSheetDataWithPaginationFromSearch
} from "../Actions/StockActions";
import { isLoggedIn } from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";
import SearchForm from "../Components/SearchForm";
import Pagination from "react-js-pagination";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  findSheetDataWithPagination: (currentPage, limitPage) => {
    dispatch(findSheetDataWithPagination(currentPage, limitPage));
  },
  findSheetDataWithPaginationFromSearch: (currentPage, limitPage, input) => {
    dispatch(findSheetDataWithPaginationFromSearch(currentPage, limitPage, input));
  },
  resetImage: () => {
    dispatch(resetImage());
  }
});

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limitPage: 5
    };
  }
  componentWillMount() {
    this.props.isLoggedIn();
    this.props.findSheetDataWithPagination(
      this.state.activePage,
      this.state.limitPage
    );
  }

  componentWillUnmount() {
    this.props.resetImage();
  }

  handlePaginationChange(currentPage, limitPage, input) {
    this.setState({ activePage: currentPage });
    if (this.props.stock.isTyping === 0) {
      this.props.findSheetDataWithPagination(currentPage, limitPage);
    } else {
      this.props.findSheetDataWithPaginationFromSearch(currentPage, limitPage, input);
    }
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
        <SearchForm />
        <br />
        <CardView sheetList={this.props.stock.data} />

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
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Shop);

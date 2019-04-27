import React, { Component } from "react";
import CardView from "../Components/CardView";
import { connect } from "react-redux";
import {
  findSheetDataWithPagination,
  findSheetDataWithPaginationFromSearch
} from "../Actions/StockActions";
import SearchForm from "../Components/SearchForm";
import Pagination from "react-js-pagination";
import { Segment, Message, Container, Responsive } from "semantic-ui-react";

const mapStatetoProps = state => {
  return {
    user: state.user,
    stock: state.stock
  };
};

const mapDispatchtoProps = dispatch => ({
  findSheetDataWithPagination: (currentPage, limitPage) => {
    dispatch(findSheetDataWithPagination(currentPage, limitPage));
  },
  findSheetDataWithPaginationFromSearch: (currentPage, limitPage, input) => {
    dispatch(
      findSheetDataWithPaginationFromSearch(currentPage, limitPage, input)
    );
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
  componentDidMount() {
    this.props.findSheetDataWithPagination(
      this.state.activePage,
      this.state.limitPage
    );
  }

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

  render() {
    return (
      <div>
        <Responsive maxWidth={800}>
          {this.props.stock.message !== "" ? (
            <div>
              {this.props.stock.message !== undefined ? (
                <div align="center">
                  <Message
                    style={{ position: "fixed", zIndex: 100, width: "100%" }}
                    positive
                  >
                    <p style={{ fontFamily: "Prompt" }}>
                      {this.props.stock.message}
                    </p>
                  </Message>
                </div>
              ) : null}
            </div>
          ) : null}
        </Responsive>

        <Responsive minWidth={801}>
          {this.props.stock.message !== "" ? (
            <Container>
              <br />
              {this.props.stock.message !== undefined ? (
                <Message positive>
                  <p style={{ fontFamily: "Prompt" }}>
                    {this.props.stock.message}
                  </p>
                </Message>
              ) : null}
            </Container>
          ) : null}
        </Responsive>
        
        <Segment
          style={{
            minHeight: "38em",
            backgroundColor: "#ebebeb"
          }}
        >
          <br />
          <br />
          <SearchForm />
          <br />
          <br />
          <CardView sheetList={this.props.stock.data} center={true} />

          {this.props.stock.isTyping === 0 ? (
            <div align="center">
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
            <div align="center">
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
        </Segment>
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Shop);

import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";
import TableView from "../Components/TableView";
import { connect } from "react-redux";
import {
  findProfileWithEmail,
  findPdfWithEmailFromPagination,
  isLoggedIn
} from "../Actions/UserActions";
import Navigationbar from "../Components/Navigationbar";
import Pagination from "react-js-pagination";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  isLoggedIn: () => {
    dispatch(isLoggedIn());
  },
  findProfileWithEmail: email => {
    dispatch(findProfileWithEmail(email));
  },
  findPdfWithEmailFromPagination: (currentPage, limitPage, email) => {
    dispatch(findPdfWithEmailFromPagination(currentPage, limitPage, email));
  }
});

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      limitPage: 7
    };
  }
  handlePaginationChange(currentPage, limitPage, email) {
    this.setState({ activePage: currentPage });
    this.props.findPdfWithEmailFromPagination(currentPage, limitPage, email);
  }
  componentWillMount() {
    this.props.isLoggedIn();
    this.props.findProfileWithEmail(this.props.user.email);
    this.props.findPdfWithEmailFromPagination(
      this.state.activePage,
      this.state.limitPage,
      this.props.user.email
    );
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.user.email !== nextProps.user.email) {
      this.props.findProfileWithEmail(nextProps.user.email);
      this.props.findPdfWithEmailFromPagination(
        this.state.activePage,
        this.state.limitPage,
        nextProps.user.email
      );
    }
    if (nextProps.user.isLoggedIn === false) {
      this.props.history.push("/Login");
    }
  }
  render() {
    return (
      <div className="container">
        {this.props.user.isLoggedIn === true ? (
          <div>
            <Navigationbar show={true} />
            <br />
            <br />
            <br />
            <h1 align="left"> My Profile</h1>
            <br />
            <Grid>
              <Row>
                {this.props.user.image !== "" ? (
                  <div>
                    <Col sm={6}>
                      {this.props.user.image === undefined ? (
                        <Image
                          width="150px"
                          height="150px"
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb0aOnZ2nFpJXZoH3-EPTHLUWhielLC6RHkJpTkdIBJW0B-8iX"
                          circle
                        />
                      ) : (
                        <Image
                          width="150px"
                          height="150px"
                          src={this.props.user.image}
                          circle
                        />
                      )}
                      <br />
                      <br />
                      {/* <p align="center">แก้ไขข้อมูล</p> */}
                    </Col>
                    <Col sm={4}>
                      <p align="left">Hello,</p>
                      <h1 align="left">{this.props.user.username}</h1>
                      {/* <p align="left"> จำนวน coin ที่คงเหลือ </p>
              <h1 align="left"> 200 Baht </h1>
              <br />
              <Button>เติม coin เพิ่ม</Button> */}
                    </Col>
                  </div>
                ) : null}
              </Row>
              <br />
              <hr />
              <h1 align="left"> My library </h1>
              <br />
              <TableView sheetPdfList={this.props.user} />
              <Pagination
                hideFirstLastPages
                activePage={this.state.activePage}
                itemsCountPerPage={this.state.limitPage}
                totalItemsCount={this.props.user.pageNumber}
                pageRangeDisplayed={5}
                onChange={currentPage => {
                  this.handlePaginationChange(
                    currentPage,
                    this.state.limitPage,
                    this.props.user.email
                  );
                }}
              />
            </Grid>
          </div>
        ) : (
          <Navigationbar show={false} />
        )}
      </div>
    );
  }
}

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Profile);

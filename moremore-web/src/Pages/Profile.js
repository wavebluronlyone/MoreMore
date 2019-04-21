import React, { Component } from "react";
import { Grid, Row, Col, Image } from "react-bootstrap";
import TableView from "../Components/TableView";
import { connect } from "react-redux";
import {
  findProfileWithEmail,
  findPdfWithEmailFromPagination
} from "../Actions/UserActions";
import Login from "./Login";
import Pagination from "react-js-pagination";
import { Segment } from "semantic-ui-react";
import profile from "../Image/profile.png";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
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
  componentDidMount() {
    this.props.findProfileWithEmail(this.props.user.email);
    this.props.findPdfWithEmailFromPagination(
      this.state.activePage,
      this.state.limitPage,
      this.props.user.email
    );
  }
  componentDidUpdate(prevProps) {
    if (this.props.user.email !== prevProps.user.email) {
      this.props.findProfileWithEmail(this.props.user.email);
      this.props.findPdfWithEmailFromPagination(
        this.state.activePage,
        this.state.limitPage,
        this.props.user.email
      );
    }
    if (this.props.user.isLoggedIn === false) {
      this.props.history.push("/Login");
    }
  }
  render() {
    return (
      <div>
        {Boolean(localStorage.getItem("isloggedIn")) === true ? (
          <Segment
            style={{
              minHeight: "38em"
            }}
          >
            <br />
            <br />
            <br />
            <br />
            <Grid>
              <h1 align="left" style={{ fontFamily: "Prompt" }}>
                {" "}
                My Profile
              </h1>
              <Row>
                {this.props.user.image !== "" ? (
                  <div>
                    <Col sm={2}>
                      {this.props.user.image === undefined ? (
                        <Image
                          width="150px"
                          height="150px"
                          src={profile}
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
                    <Col sm={5}>
                      <br />
                      <p align="left" style={{ fontFamily: "Prompt" }}>
                        Hello,
                      </p>
                      <h1 align="left" style={{ fontFamily: "Prompt" }}>
                        {this.props.user.username}
                      </h1>
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
              <h1 align="left" style={{ fontFamily: "Prompt" }}>
                {" "}
                My Library{" "}
              </h1>
              <br />
              <TableView sheetPdfList={this.props.user} />
              <div align="center">
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
              </div>
            </Grid>
          </Segment>
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
)(Profile);

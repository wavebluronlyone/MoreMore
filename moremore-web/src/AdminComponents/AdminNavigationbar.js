import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Navigationbar.css";
import { connect } from "react-redux";
import { isAdminLoggedIn, adminSignOut } from "../Actions/AdminAction";

const mapStatetoProps = state => {
  return {
    admin: state.admin
  };
};

const mapDispatchtoProps = dispatch => ({
  adminSignOut: () => {
    dispatch(adminSignOut());
  },
  isAdminLoggedIn: () => {
    dispatch(isAdminLoggedIn());
  }
});

const AdminNavigationbar = props => (
  <Navbar collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>More Sheet</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav className="nav">
        {props.admin.isLoggedIn === false
          ? props.history.push("/AdminLogin")
          : null}
        <div className="left-sub">
          <NavItem className="nav-item" eventKey={7}>
            <a
              className="linker"
              onClick={() => {
                props.adminSignOut();
              }}
              activeStyle={{
                fontWeight: "bold",
                color: "red"
              }}
              activeClassName="selected"
            >
              {"Logout"}
            </a>
          </NavItem>
        </div>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(AdminNavigationbar);

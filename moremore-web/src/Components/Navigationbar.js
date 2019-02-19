import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../Actions/UserActions";

const mapStatetoProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchtoProps = dispatch => ({
  signOut: () => {
    dispatch(signOut());
  }
});

const Item = (label, link, key) => (
  <NavItem className="nav-item" eventKey={key}>
    <Link
      className="linker"
      to={link}
      activeStyle={{
        fontWeight: "bold",
        color: "red"
      }}
      activeClassName="selected"
    >
      <p className="bar">{label}</p>
    </Link>
  </NavItem>
);

const Navigationbar = props => (
  <Navbar collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>More Sheet</Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav className="nav">
        <div>
          <div className="menu-item">{Item("Home", "/", 1)}</div>
          <div className="menu-item">{Item("Shop", "/Shop", 2)}</div>
          <div className="menu-item">{Item("About", "/About", 3)}</div>
          <div className="menu-item">{Item("รูปตระกร้า", "/Cart", 4)}</div>

          {props.show === true ? (
            <div className="right">
              <div className="right-sub">{Item("Profile", "/Profile", 5)}</div>
              <div className="left-sub">
                <NavItem className="nav-item" eventKey={7}>
                  <a
                    className="linker"
                    onClick={() => {
                      props.signOut();
                    }}
                    activeStyle={{
                      fontWeight: "bold",
                      color: "red"
                    }}
                    activeClassName="selected"
                  >
                    <p className="bar">Logout</p>
                  </a>
                </NavItem>
              </div>
            </div>
          ) : (
            <div className="right">
              <div className="right-sub">{Item("Login", "/Login", 5)}</div>
              <div>{Item("Register", "/Register", 6)}</div>
            </div>
          )}
        </div>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default connect(
  mapStatetoProps,
  mapDispatchtoProps
)(Navigationbar);

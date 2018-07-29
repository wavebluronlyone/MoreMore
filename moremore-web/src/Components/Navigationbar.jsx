import React from "react";
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import "../Styles/Navigationbar.css";

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
        {!props.show ? (
          <div>
            <div className="menu-item">{Item("Home", "/", 1)}</div>
            <div className="menu-item">{Item("Shop", "/Shop", 2)}</div>
            <div className="menu-item">{Item("About", "/About", 3)}</div>
            <div className="menu-item">
              {Item("นักทำชีทสรุป", "/Writer", 4)}
            </div>
            <div className="menu-item">{Item("รูปตระกร้า", "/Cart", 5)}</div>
            <div className="right">
              <div className="right-sub">{Item("Login", "/Login", 6)}</div>
              <div className="left-sub">{Item("Register", "/Register", 7)}</div>
            </div>
          </div>
        ) : (
          <div>
            <div className="menu-item">{Item("Home", "/name", 1)}</div>
            <div className="menu-item">{Item("Shop", "/MyShop/name", 2)}</div>
            <div className="menu-item">{Item("About", "/MyAbout/name", 3)}</div>
            <div className="menu-item">
              {Item("นักทำชีทสรุป", "/Writer/name", 4)}
            </div>
            <div className="menu-item">
              {Item("รูปตระกร้า", "/Cart/name", 5)}
            </div>
            <div className="right">
              <div className="right-sub">{Item("Profile", "/Profile", 6)}</div>
              <div className="left-sub">{Item("logout", "/Login", 7)}</div>
            </div>
          </div>
        )}
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigationbar;

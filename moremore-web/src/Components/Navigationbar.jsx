import React from 'react';
import Navbar from 'react-bootstrap/lib/Navbar';
import Nav from 'react-bootstrap/lib/Nav';
import NavItem from 'react-bootstrap/lib/NavItem';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import '../Styles/Navigationbar.css';

const Item = (label, link, key) => (

  <NavItem eventKey={key}>
    <Link
      to={link}
      activeStyle={{
        fontWeight: 'bold',
        color: 'red',
      }}
      activeClassName="selected"
    >
      {label}
    </Link>
  </NavItem>

);

const Navigationbar = () => (
  <Navbar collapseOnSelect fixedTop>
    <Navbar.Header>
      <Navbar.Brand>
        More Sheet
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav>
        {Item('Home', '/', 1)}
        {Item('Shop', '/Shop', 2)}
        {Item('About', '/About', 3)}
      </Nav>
    </Navbar.Collapse>

  </Navbar>
);

export default Navigationbar;

import React from 'react';
import { Navbar, NavItem } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg">
        <Navbar.Brand>Can of Books</Navbar.Brand>
        <NavItem style={{padding: '1em'}}><Link to="/" className="nav-link">Home</Link></NavItem>
        <NavItem style={{padding: '1em'}}><Link to="/about" className="nav-link">About</Link></NavItem>
      </Navbar>
    )
  }
}

export default Header;

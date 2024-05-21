import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../slices/authSlice';

function MyNavbar() {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/login';
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
      <Navbar.Brand href="#home" className="text-light mx-auto">Cafeto</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <NavLink className='nav-link' to="/products">Home</NavLink>
          <NavLink className='nav-link' to="/products/product-form">Add Product</NavLink>
          <NavLink className='nav-link' to="">Drinks</NavLink>
          <Nav.Link className='nav-link' to="/" onClick={handleLogout}>Log Out</Nav.Link> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default MyNavbar;

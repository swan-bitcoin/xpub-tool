import React from "react"
import { Link } from "gatsby"

import { Navbar } from "react-bootstrap"

const CustomNavbar = () => {
  return (
    <>
      <Navbar variant="dark" expand="lg" id="site-navbar">
        <Link to="/" className="link-no-style">
          <Navbar.Brand as="span">xPub</Navbar.Brand>
        </Link>
        <Link to="/hww" className="link-no-style">
          <Navbar.Brand as="span">HW Wallets</Navbar.Brand>
        </Link>
      </Navbar>
    </>
  )
}

export default CustomNavbar

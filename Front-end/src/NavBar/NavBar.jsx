// import React from "react";
import "./NavBar.css";
const NavBar = () => {
  return (
    <div className="all-navbar">
      <nav className="navbar">
        <h1 className="logo NUS">NUS</h1>
        <h1 className="logo Rate">Rate</h1>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Rate</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
          <li>
            <a className="reg-log" href="#">
              Register
            </a>
          </li>
          <li>
            <a className="reg-log" href="#">
              Login
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
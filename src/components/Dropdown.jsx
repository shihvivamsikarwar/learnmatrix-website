// src/components/Navbar/Dropdown.js
import React from "react";
import "./Dropdown.css";

const Dropdown = () => {
  return (
    <div className="dropdown">
      <button className="dropbtn">Community ▾</button>
      <div className="dropdown-content">
        <a href="#forums">Forums</a>
        <a href="#events">Events</a>
        <a href="#groups">Groups</a>
      </div>
    </div>
  );
};

export default Dropdown;

/*import React from 'react';
import { useState, useEffect } from 'react';
import '../pages/index.css';*/
import logo from "../images/header-logo.svg";

function Header() {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип Mesto" />
    </header>
  );
}

export default Header;

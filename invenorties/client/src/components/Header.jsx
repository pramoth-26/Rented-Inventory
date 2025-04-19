import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="premium-header">
      <div className="premium-header-left">
        <div className="logo-icon">I</div>
        <h1 className="header-title">
          <Link to="/">Inventory</Link>
        </h1>
      </div>

      {/* Desktop Navigation */}
      <div className="premium-header-right">
        <div className="user-info">
          <span><Link to="/" className="user-name">Home</Link></span>
          <span><Link to="/issue" className="user-name">Issue</Link></span>
          <span><Link to="/receive" className="user-name">Receive</Link></span>
          <span><Link to="/records" className="user-name">Records</Link></span>
          {/* <span><Link to="/details" className="user-name">Deatils</Link></span> */}
        </div>
        <button className="upgrade-btn"><Link to="/login" className="user-btn">Login</Link></button>
        <button className="upgrade-btn"><Link to="/signup" className="user-btn">Signup</Link></button>
      </div>

      {/* Burger Menu Button for Mobile */}
      <button className="burger-menu" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </button>

      {/* Mobile Dropdown Menu */}
      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/issue" onClick={() => setMenuOpen(false)}>Issue</Link>
        <Link to="/receive" onClick={() => setMenuOpen(false)}>Receive</Link>
        <Link to="/records" onClick={() => setMenuOpen(false)}>Records</Link>
        {/* <Link to="/details" onClick={() => setMenuOpen(false)}>Details</Link> */}
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
        <Link to="/signup" onClick={() => setMenuOpen(false)}>Signup</Link>
      </div>
    </header>
  );
};

export default Header;

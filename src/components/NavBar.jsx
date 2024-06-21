import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css'; // Import CSS styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">Podcast App</Link>
      </div>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/favorites" className="nav-link">Favorite</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile" className="nav-link">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/signup" className="nav-link">Signup</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

import React from 'react';
import './CustomNavbar.css'; // Import your custom CSS for styling

function CustomNavbar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">Home</li>
        <li className="nav-item">About</li>
        <li className="nav-item">Services</li>
        <li className="nav-item">Contact</li>
      </ul>
    </nav>
  );
}

export default CustomNavbar;

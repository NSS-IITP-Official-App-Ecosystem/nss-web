import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Navbar.css';

function Navbar() {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
    const closeDropdown = () => setDropdownOpen(false);

    return (
        <nav className="navbar">
            <div className="logo">
                <Link to="/" onClick={closeDropdown}>NSS CLUB</Link>
            </div>

            <ul className="nav-links">
                <li><Link to="/" onClick={closeDropdown}>Home</Link></li>

                {/* Unit Dropdown */}
                <li className="dropdown">
                    <button className="dropbtn" onClick={toggleDropdown}>
                        Unit {dropdownOpen ? '▴' : '▾'}
                    </button>

                    {dropdownOpen && (
                        <ul className="dropdown-content">
                            {/* This matches path="/prayatna" in your App.js */}
                            <li><Link to="/prayatna" onClick={closeDropdown}>Prayatna</Link></li>

                            {/* Placeholder links for the rest of your wings */}
                            <li><Link to="/chetna" onClick={closeDropdown}>Chetna</Link></li>
                            <li><Link to="/rural" onClick={closeDropdown}>Rural</Link></li>
                            <li><Link to="/environmental" onClick={closeDropdown}>Environmental</Link></li>
                            <li><Link to="/dnc" onClick={closeDropdown}>DNC</Link></li>
                            <li><Link to="/teaching" onClick={closeDropdown}>Teaching</Link></li>
                        </ul>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
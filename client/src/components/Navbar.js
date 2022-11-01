import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return (
        <nav className="navbar navbar-expand-sm bg-light">
             <div className="container-fluid mx-4">
                    {/* "Brand"/logo */}
                    <a className="navbar-brand" href="/"><img src="./White_Logo.png" alt="mind-connect white logo" id="white-logo"/></a>

                    {/* hamburger icon */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* menu */}
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <div className="w-100 text-right">

                        <ul className="navbar-nav">
                            <li className="nav-item"><NavLink to="/track"  className="nav-link">Tracking Page</NavLink></li>
                            <li className="nav-item" ><NavLink to="/progress" className="nav-link">Progress Page</NavLink></li>
                            <li className="nav-item" ><NavLink to="/user/:id" className="nav-link">Profile</NavLink></li>
                        </ul>
                    </div>
                    </div>
                </div>
         </nav>
    );
}
export default Navbar;

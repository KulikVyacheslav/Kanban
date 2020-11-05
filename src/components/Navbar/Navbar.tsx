import React from 'react';
import {Link, NavLink } from 'react-router-dom';
import logo from './logo.svg';

export const Navbar: React.FC = () => {

    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
            <img src={logo} alt="logo"/>
            Kanban
        </Link>
        <ul className="navbar-nav">
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/home">Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/board">Board</NavLink>
            </li>
            <li className="nav-item">
                <NavLink activeClassName="active" className="nav-link" to="/profile">Profile</NavLink>
            </li>
        </ul>
    </nav>

    );
};


import React from 'react';
import {Link} from 'react-router-dom';
import logo from './logo.svg'

export const Navbar: React.FC = () => {
    return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">
            <img src={logo} alt="logo"/>
                Kanban
            </a>
        <ul className="navbar-nav">
            <li className="nav-item mr-2">
                <Link to="/">Home</Link>
            </li>
            <li className="nav-item mr-2">
                <Link to="/board">Board</Link>
            </li>
            <li className="nav-item mr-2">
                <Link to="/profile">Profile</Link>
            </li>
        </ul>
    </nav>

    );
}


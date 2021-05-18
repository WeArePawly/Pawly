import React from 'react'
import '../styles/navbar.css';
import { Link } from 'react-router-dom';
import { logout } from '../services/auth';

export default function Dashboard(props) {

  const handleLogout = () => {
    logout().then(() => {
      props.setUser(null);
    })
  }

  return (
<nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621325707/pawly/pawly-logo_l3wgjg.jpg" width="auto" height="28"/>
        </a>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" className="navbar-menu">
        <div className="navbar-start">
          <Link to="/" className="navbar-item">Home</Link>
          <Link to="/about" className="navbar-item">About</Link>
          {props.user ? (
            <Link to="/dashboard" className="navbar-item">Dashboard</Link> ) : (null)}

          {/* <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
              More
            </a>
            <div className="navbar-dropdown">
              <a className="navbar-item">
                About
              </a>
              <a className="navbar-item">
                Jobs
              </a>
              <a className="navbar-item">
                Contact
              </a>
              <hr className="navbar-divider"/>
              <a className="navbar-item">
                Report an issue
              </a>
            </div>
          </div>*/}
        </div> 

        <div className="navbar-end">
          <div className="navbar-item">
              <div className="buttons">
                {props.user ? (
                  <Link className="button is-dark" to='/' onClick={() => handleLogout()}>Logout</Link>
                ) : (
                <>
                    <Link className="button is-primary" to="/signup">Signup</Link>
                    <Link className="button is-light" to="/login">Login</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
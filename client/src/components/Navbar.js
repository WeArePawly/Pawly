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
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {props.user ? (
          <>
            <li>
              <Link to='/dashboard'>Dashboard</Link>
            </li>
            <li>
              <Link to='/' onClick={() => handleLogout()}>Logout</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </>
        )
        }
      </ul>
    </nav>
  )
}
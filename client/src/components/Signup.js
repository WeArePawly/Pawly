import React, { useState } from 'react'
import { signup } from '../services/auth';

export default function Signup(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('dogOwner');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [username, setUsername] = useState('')
  const [message, setMessage] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    signup(email, password, role, first_name, last_name, username)
      .then(response => {
        if (response.message) {
          setMessage(response.message)
          setEmail('')
          setPassword('')
        // reset all the rest
        } else {
          console.log(response);
          props.setUser(response);
          props.history.push('/dashboard');
        }
      })
  }

  const handleOptionChange = changeEvent => {
    setRole(changeEvent.target.value)
  };

  return (
    <div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="role">Dog Owner: </label>
          <input
            id="role"
            type="radio"
            name="role"
            value="dogOwner"
            checked={role === "dogOwner"}
            onChange={handleOptionChange}
          />
          <label htmlFor="role">Vendor: </label>
          <input
            id="role"
            type="radio"
            name="role"
            value="vendor"
            checked={role === "vendor"}
            onChange={handleOptionChange}
          />
          <br></br>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor="username">Username: </label>
          <input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <label htmlFor="first_name">First Name: </label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            value={first_name}
            onChange={e => setFirstName(e.target.value)}
          />
          <label htmlFor="last_name">Last Name: </label>
          <input
            id="last_name"
            type="text"
            name="first_name"
            value={last_name}
            onChange={e => setLastName(e.target.value)}
          />
          <button type="submit">Sign Up</button>
          {message && (
            <h3>{message}</h3>
          )}
        </form>
      </div>
  )
}
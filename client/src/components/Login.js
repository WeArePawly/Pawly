import React, { useState } from 'react';
import { login } from '../services/auth';



export default function Login(props) {


const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [message, setMessage] = useState('');


  function handleSubmit(e) {
    e.preventDefault();
    login(email, password)
      .then(response => {
        if (response.message) {
          setMessage(response.message)
          setEmail('')
          setPassword('')
        } else {
          console.log(response);
          props.setUser(response);
          props.history.push('/dashboard');
        }
      })
  }


  return (
    <div>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
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
          <button type="submit">Log In</button>
          {message && (
            <h3>{message}</h3>
          )}
        </form>
      </div>
  )
}




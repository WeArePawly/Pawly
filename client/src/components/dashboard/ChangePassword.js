import React, { useState } from 'react';
import axios from 'axios';

export default function ChangePassword(props) {
  const [message, setMessage] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  
  function handleSubmit(e) {
    e.preventDefault();
    axios.post('/api/auth/password', { oldPassword, newPassword })
      .then(response => {
        if (response.message) {
          setMessage(response.message)
          setOldPassword('')
          setNewPassword('')
        } else {
          console.log(response);
          props.history.push('/dashboard');
        }
      })
      .catch(err => {
        return err;
      })
  }

  return (
    <div>
      <h1>Passwort ändern</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Aktuelles Passwort: </label>
        <input
          id="oldPassword"
          type="password"
          name="oldPassword"
          value={oldPassword}
          onChange={e => setOldPassword(e.target.value)}
        />
        <label htmlFor="username">Neues Passwort: </label>
        <input
          id="newPassword"
          type="password"
          name="newPassword"
          value={newPassword}
          onChange={e => setNewPassword(e.target.value)}
        />
        <button type="submit">Passwort ändern</button>
        {message && (
          <h3>{message}</h3>
        )}
      </form>
    </div>
  )
}

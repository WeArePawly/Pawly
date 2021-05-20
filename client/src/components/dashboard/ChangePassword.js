import React, { useState } from "react";
import axios from "axios";

export default function ChangePassword(props) {
  const [message, setMessage] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("/api/auth/password", { oldPassword, newPassword })
      .then((response) => {
        if (response.status === 400) {
          setMessage(response.data.message);
          setOldPassword("");
          setNewPassword("");
        } else {
          setMessage(response.data.message);
          setTimeout(function () {
            props.setPasswordChange(false);
          }, 5000);
        }
      })
      .catch((err) => {
        return err;
      });
  }

  return (
    <div className="pw-change">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <label class="label" htmlFor="username">
              Aktuelles Passwort:
            </label>
          </div>
          <div className="col">
            <input
              className="input"
              id="oldPassword"
              type="password"
              name="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label class="label" htmlFor="username">
              Neues Passwort:
            </label>
          </div>
          <div className="col">
            <input
              className="input"
              id="newPassword"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="align-button-to-right">
          <button className="button is-yellow" type="submit">
            Passwort ändern
          </button>
        </div>
        {message && <h3>{message}</h3>}
      </form>
    </div>
  );
}

import React, { useState } from "react";
import axios from "axios";
import ChangePassword from "./ChangePassword";

export default function SettingsOwner(props) {
  const [showPasswordChange, setPasswordChange] = useState(false);
  const [changeSettings, setChangeSettings] = useState(false);

  const [message, setMessage] = useState("");

  const [email, setEmail] = useState(props.profileData.contact.email);
  const [username, setUsername] = useState(props.profileData.username);
  const [first_name, setFirstName] = useState(
    props.profileData.full_name.first_name
  );
  const [last_name, setLastName] = useState(
    props.profileData.full_name.last_name
  );

  const editInfo = () => {
    setPasswordChange(false);
    setChangeSettings(true);
  };

  const submitChange = (e) => {
    e.preventDefault();
    axios
      .put(`/api/owners/${props.user._id}`, {
        email,
        username,
        first_name,
        last_name,
      })
      .then((response) => {
        console.log(response);
        if (response.message) {
          setMessage(response.message);
        } else {
          console.log(response);
          setMessage("Dein Profil wurde erfolgreich bearbeitet.");
          props.history.push("/dashboard");
        }
      })
      .catch((err) => {
        return err;
      });
  };
  return (
    <div className="dashboard-content">
      {props.profileData && !changeSettings && (
        <>
          <div className="row">
            <div className="cell-title">Username:</div>
            <div className="cell-desc">{props.profileData.username}</div>
          </div>
          <div className="row">
            <div className="cell-title">Name:</div>
            <div className="cell-desc">
              {props.profileData.full_name.first_name}{" "}
              {props.profileData.full_name.last_name}
            </div>
          </div>
          <label htmlFor="email">Email: </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className="row">
            <div className="cell-title">Passwort:</div>
            <div className="cell-desc">
              <button onClick={() => setPasswordChange(!showPasswordChange)}>
                Password ändern
              </button>
            </div>
            {showPasswordChange === true && <ChangePassword />}
          </div>
          <button onClick={editInfo}>Benutzerdaten ändern</button>
        </>
      )}
      {props.profileData && changeSettings && (
        <>
          <h2>Benutzerdaten ändern</h2>
          {message && <p>{message}</p>}
          <form onSubmit={submitChange}>
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <fieldset>
              <legend>Name</legend>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={first_name}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="Hanna"
              />
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={last_name}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Schmidt"
              />
            </fieldset>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Benutzerdaten ändern</button>
          </form>
        </>
      )}
    </div>
  );
}

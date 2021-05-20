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

  const [fileData, setFileData] = useState("");
  const [pictureMessage, setPictureMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

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

  function submitPicture(e) {
    e.preventDefault();

    const formData = new FormData();

    formData.append("path", fileData);

    axios
      .patch(`/api/pictures/${props.user._id}/`, formData)

      .then((response) => {
        console.log(response);
        setPictureMessage('Ihr Profilbild wurde erfolgreich hochgeladen!')
      })
      .catch((err) => err);
      setErrorMessage('Ihr Profilbild konnte nicht hochgeladen werden. Bitte versuchen Sie erneut.')
  }

  const handleFileChange = (e) => {
    console.log(e.target.files[0]);
    setFileData(e.target.files[0]);
  };
  return (
    <div className="dashboard-content settings">
      {props.profileData && !changeSettings && (
        <>
          {/* <div>
            <img src={props.profileData.avatar.path} alt="profile picture" />
          </div> */}
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
          <div className="row">
            <div className="cell-title">Email:</div>
            <div className="cell-desc">{props.profileData.contact.email}</div>
          </div>
          <div className="row">
            <div className="cell-title">Passwort:</div>
            <div className="cell-desc">
              {!showPasswordChange && (
                <button
                  className="button is-yellow"
                  onClick={() => setPasswordChange(!showPasswordChange)}
                >
                  Password ändern
                </button>
              )}
            </div>
          </div>
          <div className="row">
            {showPasswordChange === true && (
              <ChangePassword setPasswordChange={setPasswordChange} />
            )}
          </div>
          <form onSubmit={submitPicture} encType="multipart/form-data">
            <div className="row">
              <div className="cell-title">
                <label htmlFor="path">Neues Profilbild:</label>
              </div>
              <div className="cell-desc">
                <input
                  type="file"
                  name="file"
                  onChange={(e) => handleFileChange(e)}
                />
                <button className="button is-salmon" type="submit">
                  Update
                </button>
                <div>
                  {pictureMessage ?
                    <h3>{pictureMessage}</h3>
                      :
                    <h3>{errorMessage}</h3>
                    }
                </div>
              </div>
            </div>
          </form>
          <div className="align-button-to-right">
            <button
              className="button is-yellow change-settings"
              onClick={editInfo}
            >
              Benutzerdaten ändern
            </button>
          </div>
        </>
      )}
      {props.profileData && changeSettings && (
        <>
          <h3 className="title is-3">Benutzerdaten ändern</h3>
          <form onSubmit={submitChange}>
            <div className="field">
              <p className="control">
                <label className="label" htmlFor="email">
                  Email
                </label>
                <input
                  className="input"
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
            </div>
            <div className="field">
              <p className="control">
                <label className="label" htmlFor="username">
                  Username:{" "}
                </label>
                <input
                  className="input"
                  id="username"
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </p>
            </div>
            <fieldset className="name">
              <legend className="label">Name</legend>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    id="first_name"
                    type="text"
                    name="first_name"
                    placeholder="Hanna"
                    value={first_name}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </p>
              </div>
              <div className="field">
                <p className="control">
                  <input
                    className="input"
                    id="last_name"
                    type="text"
                    name="last_name"
                    placeholder="Schmidt"
                    value={last_name}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </p>
              </div>
            </fieldset>
            <div className="align-button-to-right">
              <button
                type="submit"
                className="button is-yellow change-settings"
              >
                Benutzerdaten ändern
              </button>
            </div>
          </form>
          {message && <p className="change-setting-message">{message}</p>}
        </>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import ChangePassword from './ChangePassword';

export default function SettingsOwner(props) {
  const [showPasswordChange, setPasswordChange]= useState(false);

  return (
    <div>
      {props.profileData && (
      <>
        <div className="row">
          <div className="cell-title">Username:</div>
          <div className="cell-desc">{props.profileData.username}</div>
        </div>
        <div className="row">
          <div className="cell-title">Name:</div>
          <div className="cell-desc">{props.profileData.full_name.first_name} {props.profileData.full_name.last_name}</div>
        </div>
        <div className="row">
          <div className="cell-title">Passwort:</div>
          <div className="cell-desc"><button onClick={() => setPasswordChange(!showPasswordChange)}>Password ändern</button></div>
          {showPasswordChange === true && <ChangePassword/>}
        </div>
      </>
      )}
    </div>
  )
}

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ChangePassword from './ChangePassword'

export default function DashboardOwner(props) {
  const [profileData, setProfileData] = useState(null);
  const [showPasswordChange, setPasswordChange]= useState(false);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        `/api/owners/${props.user._id}`,
      );
      console.log(response)
      setProfileData(response.data);
    }
    fetchData();
  }, [props]);

  return (
    <div className="dashboard-content">
      <h1>Owner Dashboard</h1>
      {profileData && (
      <>
        <div className="row">
          <div className="cell-title">Username:</div>
          <div className="cell-desc">{profileData.username}</div>
        </div>
        <div className="row">
          <div className="cell-title">Name:</div>
          <div className="cell-desc">{profileData.full_name.first_name} {profileData.full_name.last_name}</div>
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
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function DashboardOwner(props) {
  const [profileData, setProfileData] = useState(null);

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
    <div className="user-info">
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
          <div className="cell-desc">(Password ändern)</div>
        </div>
        <Link to="dashboard/edit">Benutzerdaten ändern</Link>
      </>
      )}
    </div>
  )
}
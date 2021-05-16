import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AddService from '../AddService'

export default function DashboardVendor(props) {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
        `/api/vendors/${props.user.vendor_id}`,
      );
      setProfileData(response.data);
    }
    fetchData();
  }, [props]);

  return (
    <div className="user-info">
      <h1>Vendor Dashboard</h1>
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
          <div className="cell-desc">(Passwort ändern)</div>
        </div>
        <div className="row">
          <div className="cell-title">Addresse:</div>
          <div className="cell-desc">{profileData.vendor_id.address.street} {profileData.vendor_id.address.house_number}, {profileData.vendor_id.address.additional_info && <>{profileData.vendor_id.address.additional_info},</>} {profileData.vendor_id.address.postal_code} {profileData.vendor_id.address.city}</div>
        </div>
        <div className="row">
          <div className="cell-title">Firmenname:</div>
          <div className="cell-desc">{profileData.vendor_id.business_name}</div>
        </div>
        <div className="row">
          <div className="cell-title">Geschäftstyp:</div>
          <div className="cell-desc">{profileData.vendor_id.business_type}</div>
        </div>
        <Link to="dashboard/edit">Benutzerdaten ändern</Link>
        <AddService/>
      </>
      )}
    </div>
  )
}
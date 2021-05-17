import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ChangePassword from './ChangePassword';

export default function SettingsVendor(props) {
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
          <div className="row">
            <div className="cell-title">Addresse:</div>
            <div className="cell-desc">{props.profileData.vendor_id.address.street} {props.profileData.vendor_id.address.house_number}, {props.profileData.vendor_id.address.additional_info && <>{props.profileData.vendor_id.address.additional_info},</>} {props.profileData.vendor_id.address.postal_code} {props.profileData.vendor_id.address.city}</div>
          </div>
          <div className="row">
            <div className="cell-title">Firmenname:</div>
            <div className="cell-desc">{props.profileData.vendor_id.business_name}</div>
          </div>
          <div className="row">
            <div className="cell-title">Geschäftstyp:</div>
            <div className="cell-desc">{props.profileData.vendor_id.business_type}</div>
          </div>
        <Link to="dashboard/edit">Benutzerdaten ändern</Link>
        </>
      )}
    </div>
  )
}

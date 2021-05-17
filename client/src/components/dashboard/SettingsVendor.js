import React, { useState } from 'react';
import ChangePassword from './ChangePassword';

export default function SettingsVendor(props) {
  const [showPasswordChange, setPasswordChange] = useState(false);
  const [changeSettings, setChangeSettings] = useState(false);

  const editInfo = () => {
    setPasswordChange(false);
    setChangeSettings(true);
  }

  const submitChange = (e) => {
    e.preventDefault();
    // axios.post('/api/auth/password', { oldPassword, newPassword })
    //   .then(response => {
    //     if (response.message) {
    //       setMessage(response.message)
    //       setOldPassword('')
    //       setNewPassword('')
    //     } else {
    //       console.log(response);
    //       props.history.push('/dashboard');
    //     }
    //   })
    //   .catch(err => {
    //     return err;
    //   })
  }


  return (
    <div>
      {(props.profileData && !changeSettings) && (
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
          <button onClick={editInfo}>Benutzerdaten ändern</button>
        </>
      )}
      {(props.profileData && changeSettings) && (
        <>
          <h2>Benutzerdaten ändern</h2>
          <form onSubmit={submitChange}>
            <fieldset>
              <legend>Name</legend>
              <input
                id="first_name"
                type="text"
                name="first_name"
                // value={first_name}
                // onChange={e => setName(e.target.value)}
                placeholder="Hanna"
              />
              <input
                id="last_name"
                type="text"
                name="last_name"
                // value={last_name}
                // onChange={e => setName(e.target.value)}
                placeholder="Schmidt"
              />
            </fieldset>
            <fieldset>
              <legend>Adresse</legend>
              <input
                id="street"
                type="text"
                name="street"
                // value={street}
                // onChange={e => setName(e.target.value)}
                placeholder="Hundestraße"
              />
              <input
                id="house_number"
                type="number"
                name="house_number"
                // value={house_number}
                // onChange={e => setName(e.target.value)}
                placeholder="1"
              />
              <input
                id="address.additional_info"
                type="text"
                name="address.additional_info"
                // value={address.additional_info}
                // onChange={e => setName(e.target.value)}
                placeholder="c/o Kaiser"
              />
              <input
                id="postal_code"
                type="number"
                name="postal_code"
                // value={house_number}
                // onChange={e => setName(e.target.value)}
                placeholder="12345"
              />
              <input
                id="city"
                type="text"
                name="city"
                // value={house_number}
                // onChange={e => setName(e.target.value)}
                placeholder="Hundestadt"
              />
            </fieldset>
            <label htmlFor="business_name">Firmenname: </label>
            <input
              id="business_name"
              type="text"
              name="business_name"
              // value={business_name}
              // onChange={e => setName(e.target.value)}
            />
            <label htmlFor="business_type">Geschäftstyp: </label>
            {/* value={props.vendorProps.business_type} onChange={handleBusinessTypeChange}  */}
            <select name="business_type" id="business_type">
                <option value="dogschool">Hundeschule</option>
                <option value="salon">Salon</option>
                <option value="tierarzt">Tierarzt</option>
            </select>
            <button type="submit">Benutzerdaten ändern</button>
          </form>
        </>
      )}
    </div>
  )
}

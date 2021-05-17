import React, { useState } from 'react';
import axios from 'axios';
import ChangePassword from './ChangePassword';

export default function SettingsVendor(props) {
  const [showPasswordChange, setPasswordChange] = useState(false);
  const [changeSettings, setChangeSettings] = useState(false);

  const [message, setMessage] = useState('');

  const [email, setEmail] = useState(props.profileData.contact.email);
  const [username, setUsername] = useState(props.profileData.username)
  const [first_name, setFirstName] = useState(props.profileData.full_name.first_name);
  const [last_name, setLastName] = useState(props.profileData.full_name.last_name);

  const [business_name, setBusinessName] = useState(props.profileData.vendor_id.business_name);
  const [street, setStreet] = useState(props.profileData.vendor_id.address.street);
  const [house_number, setHouseNumber] = useState(props.profileData.vendor_id.address.house_number);
  const [additional_address_info, setAdditionalAddressInfo] = useState(props.profileData.vendor_id.address.additional_info);
  const [postal_code, setPostalCode] = useState(props.profileData.vendor_id.address.postal_code);
  const [city, setCity] = useState(props.profileData.vendor_id.address.city);
  const [business_type, setBusinessType] = useState(props.profileData.vendor_id.business_type);

  const editInfo = () => {
    setPasswordChange(false);
    setChangeSettings(true);
  }

  const submitChange = (e) => {
    e.preventDefault();
    axios.put(`/api/vendors/${props.user.vendor_id}`, {
      email,
      username,
      first_name,
      last_name,
      business_name,
      street,
      house_number,
      additional_address_info,
      postal_code,
      city,
      business_type
    })
      .then(response => {
        console.log(response)
        if (response.message) {
          setMessage(response.message);
        } else {
          console.log(response);
          setMessage('Dein Profil wurde erfolgreich bearbeitet.');
          props.history.push('/dashboard');
        }
      })
      .catch(err => {
        return err;
      })
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
          {message && <p>{message}</p>}
          <form onSubmit={submitChange}>
            <label htmlFor="email">Email: </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <label htmlFor="username">Username: </label>
            <input
              id="username"
              type="text"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <fieldset>
              <legend>Name</legend>
              <input
                id="first_name"
                type="text"
                name="first_name"
                value={first_name}
                onChange={e => setFirstName(e.target.value)}
                placeholder="Hanna"
              />
              <input
                id="last_name"
                type="text"
                name="last_name"
                value={last_name}
                onChange={e => setLastName(e.target.value)}
                placeholder="Schmidt"
              />
            </fieldset>
            <fieldset>
              <legend>Adresse</legend>
              <input
                id="street"
                type="text"
                name="street"
                value={street}
                onChange={e => setStreet(e.target.value)}
                placeholder="Hundestraße"
              />
              <input
                id="house_number"
                type="number"
                name="house_number"
                value={house_number}
                onChange={e => setHouseNumber(e.target.value)}
                placeholder="1"
              />
              <input
                id="address.additional_info"
                type="text"
                name="address.additional_info"
                value={additional_address_info}
                onChange={e => setAdditionalAddressInfo(e.target.value)}
                placeholder="c/o Kaiser"
              />
              <input
                id="postal_code"
                type="number"
                name="postal_code"
                value={postal_code}
                onChange={e => setPostalCode(e.target.value)}
                placeholder="12345"
              />
              <input
                id="city"
                type="text"
                name="city"
                value={city}
                onChange={e => setCity(e.target.value)}
                placeholder="Hundestadt"
              />
            </fieldset>
            <label htmlFor="business_name">Firmenname: </label>
            <input
              id="business_name"
              type="text"
              name="business_name"
              value={business_name}
              onChange={e => setBusinessName(e.target.value)}
            />
            <label htmlFor="business_type">Geschäftstyp: </label>
            <select name="business_type" id="business_type" value={business_type} onChange={e => setBusinessType(e.target.value)} >
                <option value="Hundeschule">Hundeschule</option>
                <option value="Salon">Salon</option>
                <option value="Tierarzt">Tierarzt</option>
            </select>
            <button type="submit">Benutzerdaten ändern</button>
          </form>
        </>
      )}
    </div>
  )
}
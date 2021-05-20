import React, { useState } from "react";
import { signup } from "../../services/auth";
import VendorSignup from "./VendorSignup";
// import OwnerSignup from './OwnerSignup';

export default function Signup(props) {
  const [message, setMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("dogOwner");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [username, setUsername] = useState("");

  const [business_name, setBusinessName] = useState("");
  const [street, setStreet] = useState("");
  const [house_number, setHouseNumber] = useState("");
  const [additional_address_info, setAdditionalAddressInfo] = useState("");
  const [postal_code, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [business_type, setBusinessType] = useState("Hundeschule");
  // const [dogName, setDogName] = useState('');
  // const [dogBirthday, setDogBirthday] = useState('');
  // const [dogSize, setDogSize] = useState ("Klein");
  // const [dogGender, setDogGender] = useState('m');

  const vendorProps = {
    business_name,
    setBusinessName,
    street,
    setStreet,
    house_number,
    setHouseNumber,
    additional_address_info,
    setAdditionalAddressInfo,
    postal_code,
    setPostalCode,
    city,
    setCity,
    business_type,
    setBusinessType,
  };

  // const ownerProps = {
  //   dogName, setDogName,
  //   dogBirthday, setDogBirthday,
  //   dogSize, setDogSize,
  //   dogGender, setDogGender,
  // }

  function handleSubmit(e) {
    e.preventDefault();
    signup(
      email,
      password,
      role,
      first_name,
      last_name,
      username,
      business_name,
      street,
      house_number,
      additional_address_info,
      postal_code,
      city,
      business_type
      // dogName,
      // dogBirthday,
      // dogSize,
      // dogGender,
    ).then((response) => {
      if (response.message) {
        setMessage(response.message);
        setEmail("");
        setPassword("");
        // reset all the rest
      } else {
        console.log(response);
        props.setUser(response);
        props.history.push("/dashboard");
      }
    });
  }

  const handleOptionChange = (changeEvent) => {
    setRole(changeEvent.target.value);
  };

  return (
    <div className="container auth">
      <h2 className="title is-2">Werde Teil von Pawly!</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control">
            <label class="label" htmlFor="email">
              Email:{" "}
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
        <label class="label" htmlFor="password">
          Passwort:{" "}
        </label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
        </div>
        <label class="label" htmlFor="username">
          Username:{" "}
        </label>
        <div className="field">
          <p className="control">
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
        <label class="label" htmlFor="first_name">
          Vorname:{" "}
        </label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              id="first_name"
              type="text"
              name="first_name"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </p>
        </div>
        <label class="label" htmlFor="last_name">
          Nachname:{" "}
        </label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              id="last_name"
              type="text"
              name="last_name"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
          </p>
        </div>
        <br></br>
        <p className="title is-4">Ich möchte bei Pawly mitmachen als:</p>
        <div class="control check-user-type">
          <label className="radio" htmlFor="role">
            <input
              id="role-owner"
              type="radio"
              name="role"
              value="dogOwner"
              checked={role === "dogOwner"}
              onChange={handleOptionChange}
            />
            Hundebesitzer
          </label>
          <label className="radio" htmlFor="role">
            <input
              id="role-vendor"
              type="radio"
              name="role"
              value="vendor"
              checked={role === "vendor"}
              onChange={handleOptionChange}
            />
            Serviceanbieter
          </label>
        </div>
        {role === "vendor" && <VendorSignup vendorProps={vendorProps} />}
        <button type="submit" className="button is-purple">
          Jetzt anmelden!
        </button>
        {message && <h3>{message}</h3>}
      </form>
    </div>
  );
}

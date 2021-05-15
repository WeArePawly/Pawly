import React from 'react';

export default function OwnerSignup(props) {
  const handleGenderChange = changeGender => {
    props.ownerProps.setDogGender(changeGender.target.value)
  };
  return (
    <>
    <p>Füge deinen Hund zu deinem Profil hinzu 🐶</p>
    <label htmlFor="dogName">Name</label>
      <input
        id="dogName"
        type="text"
        name="dogName"
        value={props.ownerProps.dogName}
        onChange={e => props.ownerProps.setDogName(e.target.value)}
      />
      <label htmlFor="dogBirthday">Geburtstag</label>
      <input
        id="dogBirthday"
        type="date"
        name="dogBirthday"
        value={props.ownerProps.dogBirthday}
        onChange={e => props.ownerProps.setDogBirthday(e.target.value)}
      />
      <label htmlFor="dogSize">Größe</label>
      <select
        value={props.ownerProps.dogSize}
        onChange={e => props.ownerProps.setDogSize(e.target.value)}
      >
        <option value="Klein">Klein</option>
        <option value="Mittel">Mittel</option>
        <option value="Groß">Groß</option>
      </select>
      <p>Geschlecht</p>
      <label htmlFor="dogGender">M</label>
          <input
            id="dogGender-m"
            type="radio"
            name="dogGender"
            value="m"
            checked={props.ownerProps.dogGender === "m"}
            onChange={handleGenderChange}
      />
      <label htmlFor="dogGender">F</label>
          <input
            id="dogGender-f"
            type="radio"
            name="dogGender"
            value="f"
            checked={props.ownerProps.dogGender === "f"}
            onChange={handleGenderChange}
      />
    </>

  )
}

import React from 'react'

export default function VendorSignup(props) {
  const handleBusinessTypeChange = changeBusinessType => {
    props.vendorProps.setBusinessType(changeBusinessType.target.value)
  }

  return (
    <>
      <label htmlFor="business_name">Firmenname</label>
      <input
        id="business_name"
        type="text"
        name="business_name"
        value={props.vendorProps.business_name}
        onChange={e => props.vendorProps.setBusinessName(e.target.value)}
      />
      <label htmlFor="street">Adresse</label>
      <input
        id="street"
        type="text"
        name="street"
        value={props.vendorProps.street}
        onChange={e => props.vendorProps.setStreet(e.target.value)}
      />
      <label htmlFor="house_number">Hausnummer</label>
      <input
        id="house_number"
        type="number"
        name="house_number"
        value={props.vendorProps.house_number}
        onChange={e => props.vendorProps.setHouseNumber(e.target.value)}
      />
      <label htmlFor="additional_address_info">Adresszusatz</label>
      <input
        id="additional_address_info"
        type="text"
        name="additional_address_info"
        value={props.vendorProps.additional_address_info}
        onChange={e => props.vendorProps.setAdditionalAddressInfo(e.target.value)}
      />
      <label htmlFor="postal_code">PLZ </label>
      <input
        id="postal_code"
        type="number"
        name="postal_code"
        value={props.vendorProps.postal_code}
        onChange={e => props.vendorProps.setPostalCode(e.target.value)}
      />
      <label htmlFor="city">Stadt</label>
      <input
        id="city"
        type="text"
        name="city"
        value={props.vendorProps.city}
        onChange={e => props.vendorProps.setCity(e.target.value)}
      />
      <label htmlFor="business_type">Wählen Sie Ihren Geschäftstyp:</label>
      <select value={props.vendorProps.business_type} onChange={handleBusinessTypeChange} name="business_type" id="business_type">
          <option value="dogschool">Hundeschule</option>
          <option value="salon">Salon</option>
          <option value="tierarzt">Tierarzt</option>
      </select>
    </>
  )
}
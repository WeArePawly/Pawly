import React from "react";

export default function VendorSignup(props) {
  const handleBusinessTypeChange = (changeBusinessType) => {
    props.vendorProps.setBusinessType(changeBusinessType.target.value);
  };

  return (
    <>
      <label className="label" htmlFor="business_name">
        Firmenname
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="business_name"
            type="text"
            name="business_name"
            value={props.vendorProps.business_name}
            onChange={(e) => props.vendorProps.setBusinessName(e.target.value)}
          />
        </p>
      </div>
      <label className="label" htmlFor="street">
        Straße
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="street"
            type="text"
            name="street"
            value={props.vendorProps.street}
            onChange={(e) => props.vendorProps.setStreet(e.target.value)}
          />
        </p>
      </div>
      <label className="label" htmlFor="house_number">
        Hausnummer
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="house_number"
            type="number"
            name="house_number"
            value={props.vendorProps.house_number}
            onChange={(e) => props.vendorProps.setHouseNumber(e.target.value)}
          />
        </p>
      </div>
      <label className="label" htmlFor="additional_address_info">
        Adresszusatz
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="additional_address_info"
            type="text"
            name="additional_address_info"
            value={props.vendorProps.additional_address_info}
            onChange={(e) =>
              props.vendorProps.setAdditionalAddressInfo(e.target.value)
            }
          />
        </p>
      </div>
      <label className="label" htmlFor="postal_code">
        PLZ{" "}
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="postal_code"
            type="number"
            name="postal_code"
            value={props.vendorProps.postal_code}
            onChange={(e) => props.vendorProps.setPostalCode(e.target.value)}
          />
        </p>
      </div>
      <label className="label" htmlFor="city">
        Stadt
      </label>
      <div className="field">
        <p className="control">
          <input
            className="input"
            id="city"
            type="text"
            name="city"
            value={props.vendorProps.city}
            onChange={(e) => props.vendorProps.setCity(e.target.value)}
          />
        </p>
      </div>
      <label className="label" htmlFor="business_type">
        Wählen Sie Ihren Geschäftstyp:
      </label>
      <div class="select">
        <select
          value={props.vendorProps.business_type}
          onChange={handleBusinessTypeChange}
          name="business_type"
          id="business_type"
        >
          <option value="Hundeschule">Hundeschule</option>
          <option value="Salon">Salon</option>
          <option value="Tierarzt">Tierarzt</option>
        </select>
      </div>
    </>
  );
}

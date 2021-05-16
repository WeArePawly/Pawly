import axios from 'axios';
import React, {useState} from 'react';


export default function Dashboard(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [format, setFormat] = useState('');
  const [street, setStreet] = useState('');
  const [house_number, setHouseNumber] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [city, setCity] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    console.log(props, props.user)
    axios.post(`/api/vendors/${props.user.vendor_id}/addService`, {
      name,
      price,
      format,
      street,
      house_number,
      postal_code,
      city,
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleSelectChange = changeEvent => {
    setFormat(changeEvent.target.value)
  };

  return (
    <div>
        <h2>Add Service</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="price">Price: </label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <label htmlFor="format">Wählen Sie Ihren Geschäftstyp:</label>
          <select value={format} onChange={handleSelectChange} name="format" id="format">
              <option value="online">Online</option>
              <option value="onsite">Vor Ort</option>
              <option value="mobile">Mobil</option>
          </select>
          <label htmlFor="street">Adresse</label>
          <input
            id="street"
            type="text"
            name="street"
            value={street}
            onChange={e => setStreet(e.target.value)}
          />
          <label htmlFor="house_number">Hausnummer</label>
          <input
            id="house_number"
            type="number"
            name="house_number"
            value={house_number}
            onChange={e => setHouseNumber(e.target.value)}
          />
          <label htmlFor="postal_code">PLZ </label>
          <input
            id="postal_code"
            type="number"
            name="postal_code"
            value={postal_code}
            onChange={e => setPostalCode(e.target.value)}
          />
          <label htmlFor="city">Stadt</label>
          <input
            id="city"
            type="text"
            name="city"
            value={city}
            onChange={e => setCity(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
    </div>
  )
}
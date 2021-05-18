import React, {useState} from 'react';
import axios from 'axios';

export default function AddService(props) {

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [format, setFormat] = useState('onsite');
  const [street, setStreet] = useState('');
  const [house_number, setHouseNumber] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [operator_name, setOperator] = useState('');
  const [languages, setLanguages] = useState(['Deutsch']);
  const [description, setDescription] = useState('');
  const [datesInput, setDatesInput] = useState([]);
  const [dates, setDates] = useState('');
  const [group_size, setGroupSize] = useState('');

  // const [fileData, setFileData] = useState();
  // const [image, setFile] = useState("");
  
  function handleSubmit(e) {
    e.preventDefault();

    // const formData = new FormData();
    // formData.append('image', fileData)

    axios.post(`/api/vendors/${props.user.vendor_id}/addService`, {
      name,
      price,
      format,
      street,
      house_number,
      postal_code,
      city,
      operator_name,
      languages,
      description,
      dates,
      // end_date,
      group_size,
      // image
    })
    .then(response => {
      console.log(response.data)
    })
    .catch(err => {
      console.log(err);
    })
  }

  const handleFormatChange = changeEvent => {
    setFormat(changeEvent.target.value)
  };

  const handleLanguageChange = changeEvent => {
    changeEvent.persist()
    setLanguages(prevState => {
      const lang = changeEvent.target.value;
      if (prevState.includes(lang)) {
        return prevState.filter(el => el !== lang);
      }
     return [...prevState, lang]
    })
  };

  const addNewDate = event => {
    event.persist();
    setDatesInput(prevState => [...prevState, dates]);
  }

  // const handleFileChange = e => {
  //   setFileData(e.target.files[0])
  //   setFile(e.target.value)
  // }
  
  return (
    <div>
        <h2>Add Service</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <label htmlFor="name">Name: </label>
          <input
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="price">Preis: </label>
          <input
            id="price"
            type="number"
            name="price"
            value={price}
            onChange={e => setPrice(e.target.value)}
          />
          <label htmlFor="format">Wählen Sie Ihre Unterrichtsart</label>
          <select value={format} onChange={handleFormatChange} name="format" id="format">
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
          <label htmlFor="operator_name">Mitarbeiter</label>
          <input
            id="operator_name"
            type="text"
            name="operator_name"
            value={operator_name}
            onChange={e => setOperator(e.target.value)}
          />
          <label htmlFor="description">Beschreibung</label>
          <input
            id="description"
            type="textarea"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label htmlFor="languages">Wählen Sie die Sprache</label>
          <select multiple={true} value={languages} onChange={handleLanguageChange} name="languages" id="languages" >
              <option value="Deutsch">Deutsch</option>
              <option value="Englisch">Englisch</option>
          </select>

          <label htmlFor="dates">Datum:</label>
          <input
            id="date"
            type="date"
            name="dates"
            value={dates}
            onChange={e => setDates(e.target.value)}
          />
          <button type="button" onClick={addNewDate}>Weiteres Datum hinzufügen</button>

          <p>Diese Daten hast du schon ausgewählt:</p>
          <p>{dates}</p>

          {/* {addDate.map((item, i) => (
          ))} */}

          {/* 
          <label htmlFor="end_date">Enddatum</label>
          <input
            id="end_date"
            type="date"
            name="end_date"
            value={end_date}
            onChange={e => setEndDate(e.target.value)}
          /> */}

          <label htmlFor="group_size">Teilnehmer max.</label>
          <input
            id="group_size"
            type="number"
            name="group_size"
            value={group_size}
            onChange={e => setGroupSize(e.target.value)}
          />

          {/* <label htmlFor="image">Image</label>
          <input 
            type='file' 
            value={image} 
            name='file' 
            accept='image/*' 
            onChange={e => handleFileChange(e.target.files)} 
            alt='name'
            placeholder='image' /> */}
          <button type="submit">Add</button>
        </form>
            
        
    </div>
  )
}
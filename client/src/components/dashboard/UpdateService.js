import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function UpdateService(props) {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [format, setFormat] = useState('');
  const [street, setStreet] = useState('');
  const [house_number, setHouseNumber] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [city, setCity] = useState('');
  const [operator_name, setOperator] = useState('');
  const [languages, setLanguages] = useState([]);
  const [description, setDescription] = useState('');
  const [datesInput, setDatesInput] = useState('');
  const [final_dates, setFinal_dates] = useState([]);
  const [start_time, setStart_time] = useState("");
  const [end_time, setEnd_time] = useState("");
  const [group_size, setGroupSize] = useState('');

  const [fileData, setFileData] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(async() => {
      const service = await axios.get(`/api/vendors/${props.user.vendor_id}/${props.serviceId}`)
      setName(service.data.name)
      setPrice(service.data.price)
      setFormat(service.data.format)
      setStreet(service.data.location.street)
      setHouseNumber(service.data.location.house_number)
      setPostalCode(service.data.location.postal_code)
      setCity(service.data.location.city)
      setOperator(service.data.operator[0].name)
      setDescription(service.data.description)
      setGroupSize(service.data.group_size.total)
  }, [])

    function handleSubmit(e) {
      e.preventDefault()
  
      const formData = new FormData();
  
      formData.append('imgUrl', fileData)
      formData.append('name', name)
      formData.append('price', price)
      formData.append('format', format)
      formData.append('street', street)
      formData.append('house_number', house_number)
      formData.append('postal_code', postal_code)
      formData.append('city', city)
      formData.append('operator_name', operator_name)
      formData.append('languages', languages)
      formData.append('description', description)
      formData.append('group_size', group_size)
      formData.append('final_dates', final_dates)
      formData.append("start_time", start_time);
      formData.append("end_time",end_time);
  
      axios.put(`/api/vendors/${props.user.vendor_id}/addService`, formData)
      
      .then(response => {
        console.log(response)
        setMessage('Ihre Dienstleistung wurde erfolgreich geändert!')
      })
      .catch(() => {
        setErrorMessage('Bitte füllen Sie alle Pflichtfelder aus')
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


  const handleFileChange = e => {
    console.log(e.target.files[0])
    setFileData(e.target.files[0])
  }


  const addNewDate = () => {
    setFinal_dates(prevState => [...prevState, datesInput]);
  };


  return (
    <div>
        <h2>Update Service</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name: </label>
          <input
            required
            id="name"
            type="text"
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor="price">Price: </label>
          <input
            required
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
          <label htmlFor="street">Adresse *</label>
          <input
            required
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
            required
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
            required
            minlength="50"
            id="description"
            type="textarea"
            name="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          <label htmlFor="languages">Wählen Sie die Sprache</label>
          <select 
            required
            multiple={true} 
            value={languages} 
            onChange={handleLanguageChange} 
            name="languages" 
            id="languages" 
          >
            <option value="Deutsch">Deutsch</option>
            <option value="Englisch">Englisch</option>
          </select>


          <label htmlFor="dates">Datum: </label>
          <input
            required
            id="date"
            type="date"
            name="dates"
            value={datesInput}
            onChange={e => setDatesInput(e.target.value)}
          />
          <button type="button" onClick={addNewDate}>Datum hinzufügen</button>

          <p>Diese Daten hast du schon ausgewählt:</p>
          <ul>
            {final_dates.map((date,i) => (
              <li key={i}>{date}</li>
            ))}
          </ul>

          <label htmlFor="start_time">Beginn: </label>
          <input
            required
            id="start_time"
            type="time"
            name="start_time"
            value={start_time}
            onChange={(e) => setStart_time(e.target.value)}
          />

          <label htmlFor="end_time">Ende: </label>
          <input
            id="end_time"
            type="time"
            name="end_time"
            value={end_time}
            onChange={(e) => setEnd_time(e.target.value)}
          />

          <label htmlFor="group_size">Teilnehmer max.</label>
          <input
            required
            id="group_size"
            type="number"
            name="group_size"
            value={group_size}
            onChange={e => setGroupSize(e.target.value)}
          />

           <label htmlFor="imageUrl">Bild hochladen:</label>
          <input 
            type='file'
            name='file'  
            onChange={e => handleFileChange(e)} 
          />
          <button type="submit">Kurs aktualisieren</button>
          
          {message ?
            <h3>{message}</h3>
              :
            <h3>{errorMessage}</h3>
          }

        </form>
    </div>
  )
}
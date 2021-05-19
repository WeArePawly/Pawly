import React, {useState, useEffect} from 'react';
import axios from 'axios';
import DatePicker from "react-multi-date-picker";

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
  const [addDate, setAddDate] = useState(new Date());
  const [group_size, setGroupSize] = useState('');

  const [fileData, setFileData] = useState('');

  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  useEffect(async() => {
      const service = await axios.get(`/api/vendors/${props.user.vendor_id}/${props.serviceId}`)
      console.log(service.data.dates.start_date)
      setName(service.data.name)
      setPrice(service.data.price)
      setStreet(service.data.location.street)
      setHouseNumber(service.data.location.house_number)
      setPostalCode(service.data.location.postal_code)
      setCity(service.data.location.city)
      setOperator(service.data.operator[0].name)
      setDescription(service.data.description)
      setGroupSize(service.data.group_size.total)
      setAddDate(service.data.dates.addDate)
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
      formData.append('addDate', addDate)
  
      axios.post(`/api/vendors/${props.user.vendor_id}/addService`, formData)
      
      .then(response => {
        console.log(response)
        setMessage('Ihre Dienstleistung wurde erfolgreich erstellt!')
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

  const addNewDates = (values) => {
    // console.log(values)
    setAddDate(values)
  }
  const handleFileChange = e => {
    console.log(e.target.files[0])
    setFileData(e.target.files[0])
  }

  
  return (
    <div>
        <h2>Update Service</h2>
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

          <DatePicker 
          multiple
          value={addDate} 
          onChange={addNewDates}/>

          <label htmlFor="group_size">Teilnehmer max.</label>
          <input
            id="group_size"
            type="number"
            name="group_size"
            value={group_size}
            onChange={e => setGroupSize(e.target.value)}
          />
           <label htmlFor="imageUrl">Image</label>
          <input 
            type='file'
            name='file'  
            onChange={e => handleFileChange(e)} 
          />
          <button type="submit">Update</button>
          
          {message ?
            <h3>{message}</h3>
              :
            <h3>{errorMessage}</h3>
          }
        </form>
    </div>
  )
}
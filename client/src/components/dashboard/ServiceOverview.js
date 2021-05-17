import React, { useState, useEffect } from 'react';
import UpdateService from './UpdateService'
import axios from 'axios';

export default function ServiceOverview(props) {

  const [servicesData, setServicesData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [serviceId, setServiceId] = useState('')

  useEffect(() => {
    axios.get(`/api/vendors/${props.user.vendor_id}/services/`)
    .then(response => 
      setServicesData(response.data))
  }, [props])

  function handleEdit(id) {
    setServiceId(id)
    setShowEdit(!showEdit)

  }

  return (
    <div>
    {!showEdit && ( 
      <>
      {servicesData.map(service => {
        return (
      <div key={service._id}>
        <h2>{service.name}</h2>
        <p>{service.price}€</p>
        <p>Unterrichtsart: {service.format}</p>
        <p>Adresse:    
          {service.location.street} 
          {service.location.house_number} - 
          {service.location.postal_code}
          {service.location.city}</p>
        <p>Beschreibung: <br/>
          {service.description}</p>
        <p>{service.languages[0]} {service.languages[1]}</p>
        {/* <p>{service.operator}</p> */}
        {/* <Link to={`/vendors/${props.user.vendor_id}/${service._id}/`}  */}
          
        
          <button onClick={() => handleEdit(service._id)}>EDIT</button>
        
        
      </div>
      
      )
    })}
    </>
    )}
    {showEdit && 
    (<UpdateService serviceId={serviceId} user={props.user}/>)
    }
    </div>
  )
}

import React, {useState} from 'react';
import axios from 'axios';

export default function DeleteService(props) {

  
  const [toggleRefuse, setToggleRefuse] = useState(false)

  const confirmDelete = () => {
    

  axios.delete(`/api/vendors/${props.user.vendor_id}/${props.serviceId}`)
    
    .then(response => {
      console.log(response)
      
    })
    .catch(err => {
      console.log(err)
    })
  }
  
  function refuseDelete() {
    setToggleRefuse(!toggleRefuse)
  }
  
  return (
    
    <div>
      <button onClick={confirmDelete}>Bestätigen</button>
    </div> 
    
  
  )
}

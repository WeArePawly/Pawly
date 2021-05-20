import React, {useState} from 'react';
import axios from 'axios';

export default function DeleteService(props) {

  
  const [toggleRefuse, setToggleRefuse] = useState(false)
  const [message, setMessage] = useState('')

  const confirmDelete = () => {
    

  axios.delete(`/api/vendors/${props.user.vendor_id}/${props.serviceId}`)
    
    .then(response => {
      console.log(response);
      setMessage("Dein Profil wurde erfolgreich bearbeitet.");
      props.history.push("/dashboard");
    })
      .catch((err) => {
        return err;
      });
    
  };
  
  return (
    
    <div>
      <button onClick={confirmDelete}>Bestätigen</button>
    </div> 

  )
}

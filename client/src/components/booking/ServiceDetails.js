import axios from 'axios';
import React, {useState, useEffect} from 'react';
import Confirmation from './Confirmation';
import  { Redirect } from 'react-router-dom'

export default function ServiceDetails(props) {
  // Course details
  const [details, setDetails] = useState('');
  // Shows book button
  const [book, setBook] = useState(false);
  // confirm booking message
  const [confirmation, setConfirmation] = useState(false);
  // sets date for booking
  const [chooseDate, setChooseDate] = useState('');
  // sets course id
  const [courseId, setCourseId] = useState('');
  // need to send userId to service 
  const [userId, setUserId] = useState('');
  // set group size
  const [groupSize, setGroupSize] = useState('');

  useEffect(() => {
    axios.get(`/api/booking/${props.match.params.serviceId}`)
    .then(response => {
      setDetails(response.data);
      setGroupSize(response.data.group_size.total); 
    })
  }, [props])

  const handleChange = (date) => {
    // shows the button to book
    setBook(true);
    setChooseDate(date);
    setCourseId(props.match.params.serviceId);
    setUserId(props.user._id);
  }

  const handleBooking = (id) => {
    // shows success message
    setConfirmation(true)
    // sets it to false, so other dates can also be booked
    setBook(false)
    // also need to get "date" to push into user booking array

    // Still need the axios post request to save the booking in the database
    axios.put(`/api/booking/${props.match.params.serviceId}`, {
      chooseDate,
      courseId,
      userId,
      groupSize
    }).
    then(response => console.log(response))
  }


  return (
    <div>
      {!props.user && <Redirect to='/login' />}
      {!details? <h1>Gleich ist es soweit...</h1> : (
        <>
        <h1>{details.name}</h1>
        <p>{details.location.street} {details.location.house_number}</p>
        <p>{details.postal_code} {details.location.city}</p>
        <p>Beginn: {details.time.start} - {details.time.end}</p>
        <p>Trainer: {details.operator[0].name}</p>
        <p>{details.price}€</p>
        <p>{details.format}</p>
        <p>Gruppengröße: {details.group_size.total}</p>
        <p>Mögliche Termine: </p>
          {details.final_dates.map((date,i) => (
           <button type="submit" onClick={() => handleChange(date)} key={i}>{date}</button>)
          )}
        </>
      )}
      {book && 
      <button type="submit" onClick={handleBooking}>Diesen Termin verbindlich buchen</button>
      }
      {confirmation &&
        <Confirmation user={props.user}/>
      }
   </div>
  )
}
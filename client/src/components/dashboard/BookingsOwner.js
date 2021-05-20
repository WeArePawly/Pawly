import axios from 'axios'
import React, {useState} from 'react'
import Rating from '../Rating'

export default function BookingsOwner(props) {
  const [bookings, setBookings] = useState(props.user.bookings)
  const [showRating, setShowRating] = useState(false)
  
   // get the service data from the backend
  axios.get(`/api/booking/${props.user._id}/services`)
  
  function handleShowRating(id) {
    setShowRating(!showRating)
  }

  return (
    <div>
      {!bookings && <h1>Anscheinend hast du noch nichts gebucht.</h1>}
      {bookings && <h1>Hier siehst du deine Buchungen.</h1>}
      
      {showRating && 
        (<Rating user={props.user}/>)
      }
    </div>
  )
}

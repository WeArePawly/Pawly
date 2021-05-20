import axios from "axios";
import React, { useState, useEffect } from "react";
import Rating from "../Rating";

export default function BookingsOwner(props) {
  const [bookings, setBookings] = useState('');
  const [showRating, setShowRating] = useState(false);
  
  useEffect(() => {
    axios.get(`/api/booking/${props.user._id}/services`)
      .then(bookedServices => {
        setBookings(bookedServices.data)
      })
  }, [])
  
  function handleShowRating(id) {
    setShowRating(!showRating);
  }
  
  let result;

  return (
    <div>
      {!bookings && <h1>Anscheinend hast du noch nichts gebucht.</h1>}
      {bookings && (<>
        <h1>Deine Buchungen</h1>
          {bookings.map((service, i) => (
            <div key={i}>
              <h2>{service.name} am 
              {result = service.booking.filter((date,i) => 
                date.booked_by.includes(props.user._id)    
              ).map(filterResult => {
                return (
                  <p>{filterResult.booked_dates}</p>
                  )
                })
              }
              </h2>
              <p>Der Kurs kostet {service.price}€</p>
              <p>{service.location.street} {service.location.house_number}</p>
              <p>{service.location.postal_code} {service.location.city}</p>
              <p>Der Kurs beginnt um {service.time.start} und endet um {service.time.end}.</p>
              <button onClick={handleShowRating}>Bewertung hinzufügen</button>
            </div>
          )
          )}
        </>
      )}
      {showRating &&  
        (<Rating user={props.user}/>)
      }
    </div>
  );
}


 {/* {
                   date.booked_by.some(user => {
                    user === props.user._id
                   }) */}
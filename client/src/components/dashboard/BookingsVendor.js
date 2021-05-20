import axios from 'axios'
import React, {useState, useEffect} from 'react'

export default function BookingsVendor(props) {
  const [bookedServices, setBookedServices] = useState('');

  useEffect(() => {
    axios.get(`/api/booking/services/${props.user.vendor_id}`)
      .then(response => setBookedServices(response.data))
  }, [])

  let participants;

  return (
    <div>
      {!bookedServices && <h1>Es hat anscheinend noch keiner von unseren Nutzern etwas gebucht. </h1>}
      {bookedServices && (<>
        <h1>Folgende HundeliebhaberInnen haben bei Dir gebucht:</h1>
          {bookedServices.map((service, i) => (
              <div key={i}>
                  <h2>{service.name} wurde für den  
                  {participants = service.booking.map((person, i) => {
                    return (
                      <> 
                      <p>{person.booked_dates}</p> 
                      von 
                      {person.booked_by.map(username =>{
                        return(
                          <>
                            {username.username}
                          </>
                        )
                      })} gebucht.
                      </>
                    )
                  })

                  }
                  </h2>
                </div>
            )
          )}
      </>)}
    </div>
  )
}


// 1. username
// 2. when they've booked
// 3. what they've booked
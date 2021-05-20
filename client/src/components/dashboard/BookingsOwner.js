import axios from 'axios'
import React from 'react'

export default function BookingsOwner(props) {
  // get the service data from the backend


  axios.get(`/api/booking/${props.user._id}/services`)


  return (
    <div>
      this is the booking page for the owner
    </div>
  )
}

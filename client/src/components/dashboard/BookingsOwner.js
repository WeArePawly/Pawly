import { PromiseProvider } from "mongoose";
import React, {useState} from 'react';
import Rating from '../Rating'

export default function BookingsOwner(props) {

  const [showRating, setShowRating] = useState(false)

  function handleShowRating(id) {
    setShowRating(!showRating)
  }

  return (
    <div>
      {/* {!showEdit && (
        <>
        <div>
          this is the booking page for the owner
          <button onClick={() => handleShowRating()}></button>
        </div>
      </>)}
      {showRating && */}
        (<Rating user={props.user}/>)
      {/* } */}
    </div>
  )
}

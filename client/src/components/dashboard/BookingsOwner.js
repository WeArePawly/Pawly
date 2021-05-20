import axios from "axios";
import React, { useState } from "react";
import Rating from "../Rating";

export default function BookingsOwner(props) {
  const [showRating, setShowRating] = useState(false);

  // get the service data from the backend
  axios.get(`/api/booking/${props.user._id}/services`);

  function handleShowRating(id) {
    setShowRating(!showRating);
  }

  return (
    <div>
      {/* {!showEdit && (
        <>
        <div>
          this is the booking page for the owner
          <button onClick={() => handleShowRating()}></button>
        </div>
      </>)} */}
      {showRating && <Rating user={props.user} />}
    </div>
  );
}

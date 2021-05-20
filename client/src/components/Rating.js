import React, { useState, useEffect } from "react";
import StarRatingComponent from "react-star-rating-component";
import DisplayRating from "../components/DisplayRating";
import axios from "axios";

export default function Rating(props) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState("");
  const [showButton, setShowButton] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();

    const userId = props.user._id;
    const username = props.user.username;

    axios
      .patch(`/api/vendors/${props.vendorId}`, {
        rating,
        comment,
        userId,
        username,
      })
      .then((response) => {
        console.log(response);
        setMessage("Deine Bewertung wurde erfolgreich gespeichert!");
        setShowButton(false);
        setComment("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="rate-booking">
      <form onSubmit={handleSubmit}>
        <StarRatingComponent
          starCount={5}
          onStarClick={(nextValue, prevValue) =>
            setRating(nextValue, prevValue)
          }
          value={rating}
          name="rate"
        />
        <input
          className="input"
          id="comment"
          type="textarea"
          name="comment"
          value={comment}
          placeholder="Lass uns wissen wie es dir gefallen hat!"
          onChange={(e) => setComment(e.target.value)}
        />
        {showButton ? (
          <button className="button is-salmon" type="submit">
            Bewertung abschicken
          </button>
        ) : (
          <h3>{!showButton}</h3>
        )}
        <h3>{message}</h3>
      </form>
    </div>
  );
}

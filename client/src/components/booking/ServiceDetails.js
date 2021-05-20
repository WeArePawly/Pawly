import axios from "axios";
import React, { useState, useEffect } from "react";
import Confirmation from "./Confirmation";
import { Redirect } from "react-router-dom";
import "../../styles/bookings.css";

export default function ServiceDetails(props) {
  // Course details
  const [details, setDetails] = useState("");
  // Shows book button
  const [book, setBook] = useState(false);
  // confirm booking message
  const [confirmation, setConfirmation] = useState(false);
  // sets date for booking
  const [chooseDate, setChooseDate] = useState("");
  // sets course id
  const [courseId, setCourseId] = useState("");
  // need to send userId to service
  const [userId, setUserId] = useState("");
  // set group size
  const [groupSize, setGroupSize] = useState("");

  useEffect(() => {
    axios
      .get(`/api/booking/${props.match.params.serviceId}`)
      .then((response) => {
        setDetails(response.data);
        setGroupSize(response.data.group_size.total);
      });
  }, [props]);

  const handleChange = (date) => {
    // shows the button to book
    setBook(true);
    setChooseDate(date);
    setCourseId(props.match.params.serviceId);
    setUserId(props.user._id);
  };

  const handleBooking = (id) => {
    // shows success message
    setConfirmation(true);
    // sets it to false, so other dates can also be booked
    setBook(false);
    // also need to get "date" to push into user booking array

    // Still need the axios post request to save the booking in the database
    axios
      .put(`/api/booking/${props.match.params.serviceId}`, {
        chooseDate,
        courseId,
        userId,
        groupSize,
      })
      .then((response) => console.log(response));
  };
  const continueSearch = () => {
    setConfirmation(false);
    props.history.push("/training");
  };

  return (
    <div className="booking-page">
      {!props.user && <Redirect to="/login" />}
      {!details ? (
        <h3 className="title is-3">Gleich ist es soweit...</h3>
      ) : (
        <div className="booking-container">
          <h2 className="title is-3">{details.name}</h2>
          {details.service_avatar && (
            <div className="row service-img">
              <img src={details.service_avatar.imgUrl} alt="" />
            </div>
          )}
          <div className="row">
            <div className="col">Adresse:</div>
            <div className="col">
              {details.location.street} {details.location.house_number},{" "}
              {details.postal_code} {details.location.city}
            </div>
          </div>
          <div className="row">
            <div className="col">Uhrzeit: </div>
            <div className="col">
              {details.time.start} - {details.time.end}
            </div>
          </div>
          <div className="row">
            <div className="col">Trainer: </div>
            <div className="col">{details.operator[0].name}</div>
          </div>
          <div className="row">
            <div className="col">Preis: </div>
            <div className="col">{details.price}€</div>
          </div>
          <div className="row">
            <div className="col">Format: </div>
            <div className="col">{details.price}€</div>
          </div>
          <div className="row">
            <div className="col">Gruppengröße: </div>
            <div className="col">{details.group_size.total}</div>
          </div>
          <div className="row">
            <div className="col">Mögliche Termine: </div>
            <div className="col buttons">
              {details.final_dates.map((date, i) => (
                <button
                  className="button is-yellow"
                  type="submit"
                  onClick={() => handleChange(date)}
                  key={i}
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
          {book && (
            <div className="align-button-to-right">
              <button
                className="button is-salmon"
                type="submit"
                onClick={handleBooking}
              >
                Diesen Termin verbindlich buchen
              </button>
            </div>
          )}
          {confirmation && (
            <>
              <div className="confirmation-popup">
                <h4 className="title is-4">
                  Danke für deine Buchung {props.user.username}!
                </h4>
                <div className="align-button-to-right">
                  <button
                    className="button is-yellow"
                    onClick={() => continueSearch()}
                  >
                    Weiter schnüffeln
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

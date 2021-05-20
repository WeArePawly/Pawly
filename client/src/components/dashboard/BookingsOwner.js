import axios from "axios";
import React, { useState, useEffect } from "react";
import Rating from "../Rating";

export default function BookingsOwner(props) {
  const [bookings, setBookings] = useState("");
  const [showRating, setShowRating] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/booking/${props.user._id}/services`)
      .then((bookedServices) => {
        setBookings(bookedServices.data);
      });
  }, []);

  function handleShowRating(id) {
    setShowRating(!showRating);
  }

  let result;

  return (
    <div className="dashboard-content bookings-owner">
      {!bookings && (
        <h3 className="title is-3">Anscheinend hast du noch nichts gebucht.</h3>
      )}
      {bookings && (
        <>
          <h3 className="title is-3">Deine Buchungen</h3>
          {bookings.map((service, i) => (
            <div className="booking-item" key={i}>
              <h4 className="title is-4">{service.name}</h4>
              <div className="row">
                <div className="col">Termine: </div>
                <div className="col dates">
                  {
                    (result = service.booking
                      .filter((date, i) =>
                        date.booked_by.includes(props.user._id)
                      )
                      .map((filterResult) => {
                        return (
                          <>
                            <span>{filterResult.booked_dates}</span>
                            <span>, </span>
                          </>
                        );
                      }))
                  }
                </div>
              </div>
              <div className="row">
                <div className="col">Preis: </div>
                <div className="col">{service.price}€</div>
              </div>
              <div className="row">
                <div className="col">Adresse: </div>
                <div className="col">
                  {service.location.street} {service.location.house_number},{" "}
                  {service.location.additional_info &&
                    `${service.location.additional_info},`}{" "}
                  {service.location.postal_code} {service.location.city}
                </div>
              </div>
              <div className="row">
                <div className="col">Zeit: </div>
                <div className="col">
                  Der Kurs beginnt um {service.time.start} und endet um{" "}
                  {service.time.end}.
                </div>
              </div>
              <div className="align-button-to-right">
                <button className="button is-yellow" onClick={handleShowRating}>
                  Bewertung hinzufügen
                </button>
              </div>
              {showRating &&  
              (<Rating user={props.user} vendorId={service.vendor_id}/>)}
            </div>
          ))}
        </>
      )}      
    </div>
  );
}
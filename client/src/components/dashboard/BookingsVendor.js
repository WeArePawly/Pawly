import axios from "axios";
import React, { useState, useEffect } from "react";

export default function BookingsVendor(props) {
  const [bookedServices, setBookedServices] = useState("");

  useEffect(() => {
    axios
      .get(`/api/booking/services/${props.user.vendor_id}`)
      .then((response) => setBookedServices(response.data));
  }, []);

  let participants;

  return (
    <div className="dashboard-content bookings-vendor">
      {!bookedServices && (
        <h3 className="title is-3">
          Es hat anscheinend noch keiner von unseren Nutzern etwas gebucht.{" "}
        </h3>
      )}
      {bookedServices && (
        <>
          <h3 className="title is-3">
            Folgende Hundeliebhaber:innen haben bei dir gebucht:
          </h3>
          <div className="service-wrapper">
            {bookedServices.map((service, i) => (
              <div className="booking-item" key={i}>
                <h4 className="booking-item-title title is-4">
                  {service.name} wurde für den
                </h4>
                <div className="booking-item-customer">
                  {
                    (participants = service.booking.map((person, i) => {
                      return (
                        <p>
                          {person.booked_dates} von{" "}
                          {person.booked_by.map((username) => {
                            return <>{username.username}</>;
                          })}{" "}
                          gebucht.
                        </p>
                      );
                    }))
                  }
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

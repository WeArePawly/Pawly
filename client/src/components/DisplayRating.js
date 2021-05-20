import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/search.css";
import StarRatingComponent from "react-star-rating-component";

export default function DisplayRating(props) {
  const [ratingData, setRatingData] = useState("");

  useEffect(() => {
    axios.get(`/api/vendors/${props.vendorId}`).then((response) => {
      setRatingData(response.data.vendor_id.ratings);
    });
  }, [props]);

  return (
    <div>
      <h3 className="title is-3">Bewertungen</h3>
      {ratingData && (
        <>
          {ratingData.map((data, i) => {
            const allRating = data.rating_value;
            return (
              <div key={i} className="row rating-item">
                <img
                  src={
                    data.username.avatar
                      ? data.username.avatar.path
                      : "https://res.cloudinary.com/cloud-michelle/image/upload/v1621528360/pawly/placeholder-vendor_lhavwl.png"
                  }
                  alt=""
                />
                <ul key={data._id}>
                  <li>
                    <span>{data.username}</span>
                  </li>
                  <li>
                    <StarRatingComponent
                      value={allRating}
                      editing={false}
                      name="rate"
                    />
                  </li>
                  <li>{data.rating_description}</li>
                </ul>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

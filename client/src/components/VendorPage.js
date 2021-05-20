import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../styles/search.css";
import StarRating from "./search/StarRating";

export default function VendorPage(props) {
  const [vendor, setVendor] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        `/api/vendors/${props.match.params.vendorId}`
      );
      setVendor(response.data);
    }
    fetchData();
  }, [props]);

  return vendor ? (
    <div className="container single-result">
      <div className="vendor-info">
        <div className="vendor-image">
          <img
            src="https://images.unsplash.com/photo-1594499468121-f45e83e30df4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80"
            alt="Placeholder image"
          />
        </div>
        <div className="vendor-description">
          <h2 className="title is-2">
            {vendor.vendor_id.business_name}
            <div className="like">
              <div className="icon"></div>
            </div>
          </h2>
          <p>
            {vendor.vendor_id.address.street},{" "}
            {vendor.vendor_id.address.house_number},{" "}
            {vendor.vendor_id.address.postal_code}{" "}
            {vendor.vendor_id.address.city}
          </p>
          <p className="star-wrapper">
            <StarRating avg={vendor.vendor_id.avg_rating} />
            <span className="rating-num">{vendor.vendor_id.avg_rating}</span>
          </p>
          <Link
            to={`mailto:${vendor.contact.email}`}
            onClick={(e) => {
              window.location = `mailto:${vendor.contact.email}`;
              e.preventDefault();
            }}
          >
            Kontaktieren
          </Link>
          {vendor.vendor_id.specialization && (
            <ul className="specialisation-tags">
              {vendor.vendor_id.specialization.map((item) => {
                return (
                  <li>
                    <span class="tag is-link">{item}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
      <div className="intro-text">
        <p>{vendor.vendor_id.description}</p>
      </div>
      <div className="service-info">
        <h3 className="title is-3">Preise</h3>
        {vendor.vendor_id.services &&
          vendor.vendor_id.services.map((service) => {
            return (
              <div className="row">
                <div className="cell">
                  {service.group_size.total === 1
                    ? "Gruppentraining"
                    : "Einzeltraining"}
                  <Link to="" className="card-footer-item">
                    Buchen
                  </Link>
                </div>
                <div className="cell">{service.name}</div>
                <div className="cell">{service.price}€</div>
                <div className="cell">
                  <Link
                    to={`/booking/${service._id}`}
                    className="card-footer-item"
                  >
                    Buchen
                  </Link>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  ) : (
    <h2>Loading...</h2>
  );
}

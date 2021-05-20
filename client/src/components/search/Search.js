import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../styles/search.css";
import StarRating from "./StarRating";

export default function Search(props) {
  const [searchResult, setSearchResult] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [city, setCity] = useState(null);
  const [trainingType, setTrainingType] = useState(null);

  let list;

  useEffect(() => {
    if (props.search) {
      setSpecialization(props.search[0]);
      setCity(props.search[1]);
      setTrainingType(props.search[2]);
    }
    async function fetchData() {
      const response = await axios.get("/api/vendors/");
      setSearchResult(response.data);
    }
    fetchData();
  }, [props]);

  const resetFilter = () => {
    setSpecialization(null);
    setCity("");
    setTrainingType(null);
  };

  if (searchResult) {
    list = searchResult
      .filter((vendor) => {
        return specialization
          ? vendor.vendor_id.specialization.some(
              (item) => specialization === item
            )
          : true;
      })
      .filter((vendor) => {
        return city
          ? vendor.vendor_id.address.city.toLowerCase().trim() ===
              city.toLowerCase().trim()
          : true;
      })
      .filter((vendor) => {
        if (trainingType) {
          return vendor.vendor_id.services.some((service) => {
            return (
              (trainingType === "training-type-single" &&
                service.group_size.total === 1) ||
              (trainingType === "training-type-group" &&
                service.group_size.total > 1)
            );
          });
        }
        return true;
      })
      .map((vendor) => {
        let serviceMap = vendor.vendor_id.services
          .slice(0, 3)
          .map((service) => {
            return (
              <div className="service-package">
                <p>{service.name}</p>
                <p>{service.price}€</p>
              </div>
            );
          });
        return (
          <div className="card" key={vendor.vendor_id}>
            <div className="card-image">
              <figure className="image is-4by3">
                <img
                  src="https://images.unsplash.com/photo-1594499468121-f45e83e30df4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div className="card-description">
              <header className="card-header">
                <p className="card-header-title">
                  {vendor.vendor_id.business_name}
                </p>
                <div className="like">
                  <div className="icon"></div>
                </div>
              </header>
              <div className="card-content">
                <div>
                  <p>
                    {vendor.vendor_id.address.street},{" "}
                    {vendor.vendor_id.address.house_number},{" "}
                    {vendor.vendor_id.address.postal_code}{" "}
                    {vendor.vendor_id.address.city}
                  </p>
                  {vendor.vendor_id.description &&
                    (vendor.vendor_id.description.length > 100
                      ? vendor.vendor_id.description.slice(0, 200) + "[...]"
                      : vendor.vendor_id.description)}
                  <br />
                  <p className="star-wrapper">
                    <StarRating avg={vendor.vendor_id.avg_rating} />
                    <span className="rating-num">
                      {vendor.vendor_id.avg_rating}
                    </span>
                  </p>
                  <br />
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
                  <br />
                  <div className="service-overview">
                    {vendor.vendor_id.services && serviceMap}
                  </div>
                </div>
              </div>
              <div className="card-footer">
                <Link
                  to={`mailto:${vendor.contact.email}`}
                  onClick={(e) => {
                    window.location = `mailto:${vendor.contact.email}`;
                    e.preventDefault();
                  }}
                  className="card-footer-item"
                >
                  Kontaktieren
                </Link>
                <Link
                  to={`/training/${vendor.vendor_id._id}`}
                  className="card-footer-item"
                >
                  Buchen
                </Link>
              </div>
            </div>
          </div>
        );
      });
  }

  return (
    <div className="container">
      <h2 className="title is-2">Dein perfektes Match wartet auf dich! 🐕</h2>
      <div className="search-page">
        <div className="search-bar">
          <form className="search-box" onSubmit={(e) => e.preventDefault()}>
            <div className="field">
              <label className="label">Spezialisierung</label>
              <div className="control">
                <div className="select">
                  <select
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
                    <option>Bitte auswählen</option>
                    <option>Leinentraining</option>
                    <option>Trennungsangst</option>
                    <option>Welpenschule</option>
                    <option>Agility</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="field">
              <label className="label">Stadt</label>
              <input
                id="city"
                name="city"
                className="input is-link"
                type="text"
                placeholder="Deine Stadt"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="field">
              <div className="control">
                <label className="radio training-type">
                  <input
                    type="radio"
                    id="training-type-single"
                    name="training-type"
                    value="training-type-single"
                    checked={trainingType === "training-type-single"}
                    onChange={() => setTrainingType("training-type-single")}
                  />
                  Einzeltraining
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    id="training-type-group"
                    name="training-type"
                    value="training-type-group"
                    checked={trainingType === "training-type-group"}
                    onChange={() => setTrainingType("training-type-group")}
                  />
                  Gruppentraining
                </label>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control"></div>
            </div>
          </form>
          <div className="button is-link" onClick={resetFilter}>
            Filter zurücksetzen
          </div>
        </div>
        <div className="search-results">
          {searchResult ? list : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}

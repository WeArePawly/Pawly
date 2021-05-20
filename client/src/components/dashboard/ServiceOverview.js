import React, { useState, useEffect } from "react";
import UpdateService from "./UpdateService";
import DeleteService from "./DeleteService";
import AddService from "../AddService";
import axios from "axios";

export default function ServiceOverview(props) {
  const [servicesData, setServicesData] = useState([]);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [serviceId, setServiceId] = useState("");

  useEffect(() => {
    axios
      .get(`/api/vendors/${props.user.vendor_id}/services/`)
      .then((response) => {
        // Here we set servicesData to our response.data
        setServicesData(response.data);
      });
  }, [props]);

  function handleEdit(id) {
    setServiceId(id);
    setShowEdit(!showEdit);
  }

  function handleDelete(id) {
    setServiceId(id);
    setShowDelete(!showDelete);
  }

  return (
    <div className="dashboard-content services-vendor">
      <AddService user={props.user} />
      {!showEdit && (
        <>
          {servicesData.map((service) => {
            return (
              <div className="service-item" key={service._id}>
                <h3 className="title is-3">{service.name}</h3>
                <div className="row">
                  <div className="col">Preis</div>
                  <div className="col">{service.price}€</div>
                </div>
                <div className="row">
                  <div className="col">Unterrichtsart:</div>
                  <div className="col">{service.format}</div>
                </div>
                <div className="row">
                  <div className="col">Adresse:</div>
                  <div className="col">
                    {service.location.street}
                    {service.location.house_number},
                    {service.location.postal_code}
                    {service.location.city}{" "}
                  </div>
                </div>
                <div className="row">
                  <div className="col">Beschreibung:</div>
                  <div className="col">{service.description}</div>
                </div>
                <div className="row">
                  <div className="col">Sprache(n):</div>
                  <div className="col setting-tags">
                    <ul>
                      {service.languages.map((item) => {
                        return (
                          <li>
                            <span class="tag is-link">{item}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* <img src={service.service_avatar.imgUrl}/> */}

                {/* <p>{service.operator}</p>
              {/* <Link to={`/vendors/${props.user.vendor_id}/${service._id}/`}  */}

                <div className="align-button-to-right">
                  <button
                    className="button is-yellow"
                    onClick={() => handleEdit(service._id)}
                  >
                    Bearbeiten
                  </button>
                </div>
                <div className="align-button-to-right">
                  <button
                    className="button is-yellow"
                    onClick={() => handleDelete(service._id)}
                  >
                    Entfernen
                  </button>
                </div>
                {showDelete ? (
                  <DeleteService serviceId={serviceId} user={props.user} />
                ) : (
                  showDelete
                )}
              </div>
            );
          })}
        </>
      )}

      {showEdit && <UpdateService serviceId={serviceId} user={props.user} />}
    </div>
  );
}

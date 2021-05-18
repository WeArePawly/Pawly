import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import '../../styles/search.css'

export default function Search(props) {
  const [searchResult, setSearchResult] = useState(null);
  const [specialization, setSpecialization] = useState(null);
  const [age, setAge] = useState(null);
  const [trainingType, setTrainingType] = useState(null);

  let list;

  useEffect(() => {
    if (props.search) {
      setSpecialization(props.search[0])
      setAge(props.search[1])
      setTrainingType(props.search[2])
    }
    async function fetchData() {
      const response = await axios(
          '/api/vendors/',
        );
        setSearchResult(response.data);
      }
    fetchData();
  }, [props]);


  if(searchResult) {
    list = searchResult
    .filter(
      vendor => {
        if (specialization) {
          return vendor.vendor_id.specialization === specialization
        }
        else {
          return vendor
        }
      }
    )
    .map(vendor => {
      return (
        <div className="card" key={vendor.vendor_id}>
          <div class="card-image">
            <figure class="image is-4by3">
              <img src="https://images.unsplash.com/photo-1594499468121-f45e83e30df4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1250&q=80" alt="Placeholder image" />
            </figure>
          </div>
          <div className="card-description">
            <header className="card-header">
              <p className="card-header-title">
                {vendor.vendor_id.business_name}
              </p>
              <div className="like"><div className="icon"></div></div>
            </header>
            <div className="card-content">
              <div className="content">
                <p>{vendor.vendor_id.address.street}, {vendor.vendor_id.address.house_number}, {vendor.vendor_id.address.postal_code}, {vendor.vendor_id.address.city}</p>
                { vendor.vendor_id.description && (vendor.vendor_id.description.length > 100 ? vendor.vendor_id.description.slice(0,200) + '[...]' : vendor.vendor_id.description)}
                <br/>
                <div className="service-overview">
                  {vendor.vendor_id.services && (
                    vendor.vendor_id.services.map(service => {
                      return(
                        <div className="service-package">
                          <p>{service.name}</p>
                          <p>{service.price}€</p>
                        </div>
                      )
                    })
                  )}
                </div>
                {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
              </div>
            </div>
            <footer className="card-footer">
              <Link className="card-footer-item">Kontaktieren</Link>
              <Link to="/" className="card-footer-item">Buchen</Link>
            </footer>
          </div>
        </div>
      )
    })
  }

  return (
    <div className="search-results">
      {searchResult ? list : <p>Loading...</p>}
    </div>
  )
}

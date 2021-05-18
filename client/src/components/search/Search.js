import React, {useState, useEffect} from 'react';
import axios from 'axios';
import '../../styles/search.css'

export default function Search(props) {
  const [searchResult, setSearchResult] = useState(null);
  let list;

  useEffect(() => {
    async function fetchData() {
      const response = await axios(
          '/api/vendors/',
        );
        setSearchResult(response.data);
      }
    fetchData();
    console.log(searchResult)
  }, []);


  if(searchResult) {
    list = searchResult.map(vendor => {
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
            </header>
            <div className="card-content">
              <div className="content">
                { vendor.vendor_id.description && (vendor.vendor_id.description.length > 100 ? vendor.vendor_id.description.slice(0,200) + '[...]' : vendor.vendor_id.description)}
                <br/>
                {/* <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time> */}
              </div>
            </div>
            <footer className="card-footer">
              {/* <a href="#" className="card-footer-item">See</a>
              <a href="#" className="card-footer-item">Edit</a>
              <a href="#" className="card-footer-item">Delete</a> */}
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

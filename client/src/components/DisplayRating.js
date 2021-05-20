
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import "../styles/search.css";
import StarRatingComponent from 'react-star-rating-component';

export default function DisplayRating(props) {
  
  const [ratingData, setRatingData] = useState('');
  
  useEffect(() => {
    axios.get(`/api/vendors/${props.vendorId}`)
    .then(response => {
      setRatingData(response.data.vendor_id.ratings)
    })
  }, [props])
 
  return (
      <div>
        {ratingData && (
          <>
            {ratingData.map((data,i) => {
              const allRating = data.rating_value;
              return (
                <div key={i} className="row">
                  <ul key={data._id}>
                    <li>{data.username}</li>
                    <li><StarRatingComponent 
                        value={allRating}
                        editing={false}
                        name="rate"
                      />
                      </li>
                    <li>{data.rating_description}</li>
                  </ul>
                </div>
              )
            })}
          </>
        )}
      </div>
  ) 
}


 
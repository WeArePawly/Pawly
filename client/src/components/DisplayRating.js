
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

export default function DisplayRating(props) {

  const [ratingData, setRatingData] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/vendors/60a550521cc90a61f40d8b30/`)
    .then(response => {
      console.log(response.data)
      // setRatingData(response.data.vendor_id.ratings)
    })
  }, [props])
  
 
  return (
   <>

    <div>
    {ratingData.map(data => {
      const allRating = data.rating_value;
    return (
      <div key={data._id}>
        <h3></h3>
        <StarRatingComponent 
            value={allRating}
            editing={false}
            name="rate"
        />
        <h4>{data.username}</h4>

        <p>{data.rating_description}</p>
      </div>
    )
  
  })}
  </div>
  </>
  ) 
}


 

import React, {useState, useEffect} from 'react';
import axios from 'axios';
import StarRatingComponent from 'react-star-rating-component';

export default function DisplayRating(props) {

  const [ratingData, setRatingData] = useState([]);
  const [avgRating, setAvgRating] = useState()
  
  useEffect(() => {
    axios.get(`/api/vendors/60a62e18d367895c2999c785/`)
    .then(response => {

      setRatingData(response.data.vendor_id.ratings)
      setAvgRating(response.data.vendor_id.avg_rating)

    })
  }, [props])
  
 
  return (
   <>

    <div>
    <StarRatingComponent 
            value={avgRating}
            editing={false}
            name="rate"
        />


        
    {ratingData.map(data => {
      const allRating = data.rating_value;
    return (
      <div key={data._id}>
        
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
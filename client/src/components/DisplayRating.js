
import React, {useState, useEffect} from 'react';
import axios from 'axios'

export default function DisplayRating(props) {

  const [ratingData, setRatingData] = useState([]);
  
  useEffect(() => {
    axios.get(`/api/vendors/60a534a54d2c4edc083e9336/`)
    .then(response => {
      console.log(response)
      setRatingData(response.data.vendor_id.ratings)})
  }, [props])
  

  return (
  <>
    {ratingData.map(data => {
    
    return (
  
      <h3>{data.rating_value}</h3>
  
    )
  
  })}
  </>
  ) 
}


 
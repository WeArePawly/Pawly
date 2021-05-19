import React, {useState} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';

export default function Rating() {

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [showButton, setShowButton] = useState(true)

  const handleSubmit = (event) => {

    event.preventDefault()

    axios.put(`/api/vendors/`, {
      rating,
      comment
    })
      .then(() => {
        setMessage('Ihre Bewertung wurde erfolgreich gespeichert!')
      })
      .catch(err => {
        console.log(err)
      })
  }
  

  return (
    
      <div>
        <form onSubmit={handleSubmit}>
          <h2>Rating: {rating}</h2>
          
          <StarRatingComponent 
            starCount={5}
            onStarClick={(nextValue, prevValue) => setRating(nextValue, prevValue)}
            value={rating}
            name="rate"
          />
          <label htmlFor="comment">Bewertung</label>
          <input
            id="comment"
            type="textarea"
            name="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
          />
          {showButton ?
            <button onClick={() => setShowButton(false)} type="submit">Bewertung speichern</button> :
            <h3>{message}</h3>
          }
        </form>
      </div>
  )  
}

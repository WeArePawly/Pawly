import React, {useState, useEffect} from 'react';
import StarRatingComponent from 'react-star-rating-component';
import DisplayRating from '../components/DisplayRating'
import axios from 'axios';

export default function Rating(props) {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [showButton, setShowButton] = useState(true)
  

  

  const handleSubmit = (event) => {
    event.preventDefault()
    
    const userId = props.user._id
    const username = props.user.username
    
    axios.patch(`/api/vendors/60a62e18d367895c2999c785`, {
      rating,
      comment,
      userId,
      username
    })
      .then((response) => {
        setMessage('Ihre Bewertung wurde erfolgreich gespeichert!')
        setShowButton(false)
        setComment('')
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
          {/* <button type="submit">Bewertung speichern</button> */}
          {showButton ?
            <button type="submit">Bewertung speichern</button> :
            <h3>{!showButton}</h3>
          }
          <h3>{message}</h3>
        </form>
        
         <DisplayRating user={props.user}/> 
      </div>
  )  
}

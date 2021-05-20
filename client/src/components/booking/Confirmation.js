import React from 'react'

export default function Confirmation(props) {
  return (
    <div>
      <h1>Danke für deine Buchung {props.user.username}!</h1>
      <button>Weiter schnüffeln</button>
    </div>
  )
}

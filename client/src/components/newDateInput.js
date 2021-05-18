import React, {useState} from 'react'

export default function NewDateInput() {

  const [newDate, setNewDate] = useState('');

  return (
    <>
      <input
        type="date"
        name="date"
        value={newDate}
        onChange={e => setNewDate(e.target.value)}
      />
    </>
  )
}

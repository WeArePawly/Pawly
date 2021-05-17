import React from 'react'

export default function SidebarOwner(props) {
  return (
    <div className="sidebar">
      <ul>
        <li onClick={props.handleClick} className="active">Übersicht</li>
        <li onClick={props.handleClick}>Benutzerdaten</li>
        <li onClick={props.handleClick}>Favoriten</li>
        <li onClick={props.handleClick}>Buchungen</li>
      </ul>
    </div>
  )
}
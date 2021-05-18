import React from 'react'

export default function SidebarVendor(props) {
  return (
    <aside className="menu">
      <ul className="menu-list">
        <li onClick={props.handleClick} className="active">Übersicht</li>
        <li onClick={props.handleClick}>Benutzerdaten</li>
        <li onClick={props.handleClick}>Dienstleistungen</li>
        <li onClick={props.handleClick}>Buchungen</li>
      </ul>
    </aside>
  )
}
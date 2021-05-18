import React from 'react'

export default function SidebarOwner(props) {
  return (
    <aside className="menu">
      {/* <p className="menu-label">
        General
      </p> */}
      <ul className="menu-list">
        <li onClick={props.handleClick} className="active">Übersicht</li>
        <li onClick={props.handleClick}>
        Benutzerdaten</li>
        <li onClick={props.handleClick}>Favoriten</li>
        <li onClick={props.handleClick}>Buchungen</li>
      </ul>
      {/* <p className="menu-label">
        Administration
      </p>
      <ul className="menu-list">
        <li><a>Team Settings</a></li>
        <li>
          <a className="is-active">Manage Your Team</a>
          <ul>
            <li><a>Members</a></li>
            <li><a>Plugins</a></li>
            <li><a>Add a member</a></li>
          </ul>
        </li>
      </ul> */}
    </aside>
  )
}
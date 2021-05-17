import React from 'react'
import { Link } from 'react-router-dom';

export default function SidebarVendor(props) {
  return (
    <div className="sidebar">
      <ul>
        <li>Übersicht</li>
        <li>Benutzerdaten</li>
        <li>Favoriten</li>
        <li>Buchungen</li>
      </ul>
    </div>
  )
}

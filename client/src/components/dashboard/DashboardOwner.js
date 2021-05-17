import React from 'react';

export default function DashboardOwner(props) {
  return (
    <div className="dashboard-content">
      <h1>Owner Dashboard</h1>
      <p>Willkommen zurück, {props.user.username} 🐕</p>
    </div>
  )
}
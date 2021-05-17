import React from 'react';

export default function DashboardVendor(props) {
  return (
    <div className="dashboard-content">
      <h1>Vendor Dashboard</h1>
      <p>Willkommen zurück, {props.user.username} 🐕</p>
    </div>
  )
}
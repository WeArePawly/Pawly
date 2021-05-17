import React from 'react';
import AddService from '../AddService';

export default function DashboardVendor(props) {
  return (
    <div className="dashboard-content">
      <h1>Vendor Dashboard</h1>
      <p>Willkommen zurück, {props.user.username} 🐕</p>
      <AddService user={props.user}/>
    </div>
  )
}
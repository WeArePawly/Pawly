import React from 'react';
// import AddService from '../AddService';
// import UpdateService from '../UpdateService';
// import VendorServices from './VendorServices';

export default function DashboardVendor(props) {
  return (
    <div className="dashboard-content">
      <h1>Vendor Dashboard</h1>
      <p>Willkommen zurück, {props.user.username} 🐕</p>
      <VendorServices user={props.user}/>
      <AddService user={props.user}/>
    </div>
  )
}
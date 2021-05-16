import React from 'react';
import DashboardOwner from './dashboard/DashboardOwner';
import DashboardVendor from './dashboard/DashboardVendor';

export default function Dashboard(props) {
  if (props.user.role === "vendor") {
    return <DashboardVendor user={props.user}/>
  }
  return <DashboardOwner user={props.user}/>
}
import React, {useState} from 'react';
import '../styles/dashboard.css';
import DashboardOwner from './dashboard/DashboardOwner';
import DashboardVendor from './dashboard/DashboardVendor';
import UpdateService from './UpdateService';
import SidebarOwner from './dashboard/SidebarOwner';
import SidebarVendor from './dashboard/SidebarVendor';


export default function Dashboard(props) {
  const [clickedSidebarItem, setSidebarItem] = useState('Übersicht');

  if (props.user.role === "vendor") {
  return (
    <div className="dashboard-wrapper">
      <SidebarVendor/>
      <DashboardVendor user={props.user}/>
    </div>
  )
  }
  return (
    <div className="dashboard-wrapper">
      <SidebarOwner/>
      <DashboardOwner user={props.user}/>
    </div>
  )
}
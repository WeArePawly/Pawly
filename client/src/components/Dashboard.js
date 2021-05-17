import React, {useState} from 'react';
import '../styles/dashboard.css';
import DashboardOwner from './dashboard/DashboardOwner';
import DashboardVendor from './dashboard/DashboardVendor';
import UpdateService from './UpdateService';
import SidebarOwner from './dashboard/SidebarOwner';
import SidebarVendor from './dashboard/SidebarVendor';
import BookingsOwner from './dashboard/BookingsOwner';
import BookingsVendor from './dashboard/BookingsVendor';
import ServiceOverview from './dashboard/ServiceOverview';
import SettingsOwner from './dashboard/SettingsOwner';
import SettingsVendor from './dashboard/SettingsVendor';
import Favorites from './dashboard/Favorites'

export default function Dashboard(props) {
  const [clickedSidebarItem, setSidebarItem] = useState('Übersicht');
  let sidebar;
  let content;
  const handleClick = (e) => {
    setSidebarItem(e.target.innerText)
    let listItems = document.querySelectorAll(".sidebar ul li");
    listItems.forEach(item => {
      item.classList.remove("active")
    })
    e.target.classList.add("active")
  }

  if (props.user.role === "vendor") {
    sidebar = <SidebarVendor handleClick={handleClick} clickedSidebarItem={clickedSidebarItem} setSidebarItem={setSidebarItem}/>
    if (clickedSidebarItem === 'Übersicht') {
      content = <DashboardVendor user={props.user}/>
    }
    else if (clickedSidebarItem === 'Benutzerdaten') {
      content = <SettingsVendor user={props.user}/>
    }
    else if (clickedSidebarItem === 'Dienstleistungen') {
      content = <ServiceOverview user={props.user}/>
    }
    else if (clickedSidebarItem === 'Buchungen') {
      content = <BookingsVendor user={props.user}/>
    }
  }
  else if (props.user.role === "dogOwner") {
    sidebar = <SidebarOwner handleClick={handleClick} clickedSidebarItem={clickedSidebarItem} setSidebarItem={setSidebarItem} />
    if (clickedSidebarItem === 'Übersicht') {
      content = <DashboardOwner user={props.user}/>
    }
    else if (clickedSidebarItem === 'Benutzerdaten') {
      content = <SettingsOwner user={props.user}/>
    }
    else if (clickedSidebarItem === 'Favoriten') {
      content = <Favorites user={props.user}/>
    }
    else if (clickedSidebarItem === 'Buchungen') {
      content = <BookingsOwner user={props.user}/>
    }
  }

  return (
    <div className="dashboard-wrapper">
      {sidebar}
      {content}
    </div>
  )
}
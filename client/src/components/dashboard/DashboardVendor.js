import React from "react";

export default function DashboardVendor(props) {
  return (
    <div className="dashboard-content general">
      <figure class="image is-128x128">
        <img
          class="is-rounded"
          src={
            props.user.avatar
              ? props.user.avatar.path
              : "https://res.cloudinary.com/cloud-michelle/image/upload/v1621528360/pawly/placeholder-vendor_lhavwl.png"
          }
        />
      </figure>
      <h3 className="title is-3">
        Willkommen zurück, {props.user.username} 🐕
      </h3>
    </div>
  );
}

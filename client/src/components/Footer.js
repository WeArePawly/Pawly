import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="columns">
        <div className="column">
          <ul>
            <li>About</li>
            <li>Instagram</li>
            <li>Facebook</li>
          </ul>
        </div>
        <div className="column">
          <ul>
            <li>Datenschutzerklärung</li>
            <li>Impressum</li>
            <li>AGB</li>
            <li>Kontakt</li>
          </ul>
        </div>
      </div>
      <div className="has-text-centered footer-logo">
        <img
          src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621524611/pawly/Pawly_Logo_white_rvpxbh.png"
          alt="logo weiss"
        />
        <span>Berlin.</span>
      </div>
    </footer>
  );
}

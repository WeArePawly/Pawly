import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="">
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
        <p className="has-text-centered">Aus Berlin mit ❤️ & 🐶</p>
      </div>
    </footer>
  );
}

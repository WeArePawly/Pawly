import React from 'react';
import '../styles/footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="">
        <div class="columns">
          <div class="column">
            <ul>
              <li>About</li>
              <li>Instagram</li>
              <li>Facebook</li>
            </ul>
          </div>
          <div class="column">
          <ul>
            <li>Datenschutzerklärung</li>
            <li>Impressum</li>
            <li>AGB</li>
            <li>Kontakt</li>
          </ul>
          </div>
        </div>
        <p className="has-text-centered">Aus Berlin.</p>
      </div>
    </footer>
  )
}

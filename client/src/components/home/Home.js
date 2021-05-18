import React from 'react';
import '../../styles/home.css';

export default function Home() {
  const submitSearchForm = (e) => {
    e.preventDefault();
    console.log('clicked')
  }
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <p className="title">
        Finde schnell & einfach die perfekten Trainer:innen für dich & deinen Hund
        </p>
        <form className="search-box" onSubmit={submitSearchForm}>
          <div className="field">
            <label className="label">Spezialisierung</label>
            <div className="control">
              <div className="select">
                <select>
                  <option>Bitte auswählen</option>
                  <option>Leinentraining</option>
                  <option>Trennungsangst</option>
                  <option>Welpenschule</option>
                  <option>Agility</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <label className="label">Alter</label>
            <div className="control">
              <div className="select">
                <select>
                <option>Bitte auswählen</option>
                  <option>Welpe (0-5 Monate)</option>
                  <option>Junghund (6-17 Monate)</option>
                  <option>Erwachsen (18+ Monate)</option>
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <label className="radio training-type">
                <input type="radio" id="training-type-single" name="training-type"/>
                Einzeltraining
              </label>
              <label className="radio">
                <input type="radio" id="training-type-group" name="training-type"/>
                Gruppentraining
              </label>
            </div>
          </div>
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-link" type="submit">Jetzt schnüffeln</button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}
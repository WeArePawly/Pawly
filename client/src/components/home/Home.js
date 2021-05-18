import React, {useState} from 'react';
import axios from 'axios';
import '../../styles/home.css';

export default function Home(props) {
  const [specialization, setSpecialization] = useState('');
  const [age, setAge] = useState('');
  const [trainingType, setTrainingType] = useState('');


  const submitSearchForm = (e) => {
    e.preventDefault();
    props.setSearch([specialization, age, trainingType])
    props.history.push('/training');
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
                <select id="specialization" value={specialization} onChange={e => setSpecialization(e.target.value)}>
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
                <select id="age" value={age} onChange={e => setAge(e.target.value)}>
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
                <input type="radio" id="training-type-single" name="training-type" value="training-type-single" checked={trainingType === "training-type-single"} onChange={() => setTrainingType("training-type-single")} />
                Einzeltraining
              </label>
              <label className="radio">
              <input type="radio" id="training-type-group" name="training-type" value="training-type-group" checked={trainingType === "training-type-group"} onChange={() => setTrainingType("training-type-group")} />
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
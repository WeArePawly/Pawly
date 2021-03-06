import React, { useState } from "react";
import "../../styles/home.css";

export default function Home(props) {
  const [specialization, setSpecialization] = useState("");
  const [city, setCity] = useState(null);
  const [trainingType, setTrainingType] = useState("");

  const submitSearchForm = (e) => {
    e.preventDefault();
    props.setSearch([specialization, city, trainingType]);
    props.history.push("/training");
  };
  return (
    <>
      <section className="hero is-fullheight-with-navbar">
        <div className="hero-body">
          <h1 className="title is-1">
            Finde schnell & einfach die perfekten Trainer:innen für dich &
            deinen Hund
          </h1>
          <form className="search-box" onSubmit={submitSearchForm}>
            <div className="field">
              <label className="label">Spezialisierung</label>
              <div className="control">
                <div className="select">
                  <select
                    id="specialization"
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  >
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
              <label className="label">Stadt</label>
              <input
                id="city"
                name="city"
                className="input is-link"
                type="text"
                placeholder="Deine Stadt"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            <div className="field">
              <div className="control">
                <label className="radio training-type">
                  <input
                    type="radio"
                    id="training-type-single"
                    name="training-type"
                    value="training-type-single"
                    checked={trainingType === "training-type-single"}
                    onChange={() => setTrainingType("training-type-single")}
                  />
                  Einzeltraining
                </label>
                <label className="radio">
                  <input
                    type="radio"
                    id="training-type-group"
                    name="training-type"
                    value="training-type-group"
                    checked={trainingType === "training-type-group"}
                    onChange={() => setTrainingType("training-type-group")}
                  />
                  Gruppentraining
                </label>
              </div>
            </div>
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-purple" type="submit">
                  Jetzt schnüffeln
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
      <section className="bold-statement">
        <div className="container">
          <h1 className="title is-1">
            Our mission is to make life with dogs easier, hassle-free and save
            time, so you can spend it with your furry friend.
          </h1>
        </div>
      </section>
      <section className="steps">
        <div className="container">
          <h2 className="title is-2 has-text-centered">
            Vier einfache Schritte
          </h2>
          <div className="columns">
            <div className="column">
              <img
                src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621519711/pawly/sign_up_icon_t1ywok.png"
                alt="anmelden"
              />
              <h4 className="title is-4 content has-text-centered">Anmelden</h4>
              <p className="has-text-centered">
                Geniese den einfacher Zugang zu unserem Trainernetzwerk -
                überall & jederzeit.
              </p>
            </div>
            <div className="column">
              <img
                src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621519711/pawly/search_icon_u7fthw.png"
                alt="suchen"
              />
              <h4 className="title is-4 has-text-centered">Suchen</h4>
              <p className="has-text-centered">
                Es war noch nie einfacher: nutze unsere Suche und finde sofort
                dein perfektes Match!
              </p>
            </div>
            <div className="column">
              <img
                src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621519711/pawly/Booking_icon_irbfq1.png"
                alt="buchen"
              />
              <h4 className="title is-4 has-text-centered">Buchen</h4>
              <p className="has-text-centered">
                Wir setzen lückenhaften Informationen ein Ende, du bekommst
                genau das was du willst!
              </p>
            </div>
            <div className="column">
              <img
                src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621519711/pawly/enjoy_icon_vqlkwb.png"
                alt="genießen"
              />
              <h4 className="title is-4 has-text-centered">Genießen</h4>
              <p className="has-text-centered">
                Wir setzen lückenhaften Informationen ein Ende, du bekommst
                genau das was du willst!
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="reason">
        <div className="container">
          <h2 className="title is-2">
            Warum
            <img
              src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621510947/pawly/pawly-logo-small_clxuey.png"
              alt=""
            />
            ?
          </h2>
          <div className="reason-item-container">
            <div className="reason-item">
              <div className="reason-wrap">
                <img
                  src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621520334/pawly/One_platform_foqga5.png"
                  alt="one platform"
                />
                <h3 className="title is-3">1. One platform for all</h3>
                <p>Search, book, and pay - all on a single platform</p>
              </div>
            </div>
            <div className="reason-item">
              <div className="reason-wrap">
                <img
                  src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621520334/pawly/Full_transparency_yixf60.png"
                  alt="transparency"
                />
                <h3 className="title is-3">2. Full transparency</h3>
                <p>
                  Have confidence and full knowledge before booking any dog
                  services.
                </p>
              </div>
            </div>
            <div className="reason-item">
              <div className="reason-wrap">
                <img
                  src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621520334/pawly/Quick_matching_wwl0ko.png"
                  alt="matching"
                />
                <h3 className="title is-3">3. Quick matching</h3>
                <p>Intuitive, filter-based search in your neighborhood</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section className="service-statement">
        <div className="container">
          <h2 className="title is-2 has-text-centered">
            So funktioniert Pawly
          </h2>
          <div className="columns">
            <div className="column">
              <h4 className="title is-4 content has-text-centered">
                Accessible
              </h4>
              <p className="has-text-centered">
                Geniese den einfacher Zugang zu unserem Trainernetzwerk -
                überall & jederzeit.
              </p>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Matching</h4>
              <p className="has-text-centered">
                Es war noch nie einfacher: nutze unsere Suche und finde sofort
                dein perfektes Match!
              </p>
            </div>
            <div className="column">
              <h4 className="title is-4 has-text-centered">Transparent</h4>
              <p className="has-text-centered">
                Wir setzen lückenhaften Informationen ein Ende, du bekommst
                genau das was du willst!
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <section className="join">
        <div className="container">
          <h2 className="title is-3 content has-text-centered">
            Mach mit bei
            <img
              src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621523655/pawly/Pawly-Logo-yellow_k3rqgu.png"
              alt="gelbes logo"
            />
          </h2>
          <div className="columns">
            <div className="column owner-signup">
              <p>Suchst du einen Trainer?</p>
              <button className="button is-yellow">Sign up</button>
            </div>
            <div className="column trainer-signup">
              <p>Möchtest du deine Dienstleistungen anbieten?</p>
              <button className="button is-yellow">Sign up</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

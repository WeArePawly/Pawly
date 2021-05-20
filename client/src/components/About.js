import React from "react";
import "../styles/about.css";

export default function About() {
  return (
    <div className="container about">
      <h2 className="title is-2">
        Die Menschen hinter
        <img
          src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621510947/pawly/pawly-logo-small_clxuey.png"
          alt=""
        />
      </h2>
      <div className="columns team">
        <div className="column">
          <h3 className="title is-3">Anne</h3>
          <img
            className="is-rounded"
            src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621552826/pawly/anne_uualdk.jpg"
          />
          <p>
            Gründerin, Hundemama & Kraulmaschine von Jingles
            <br />
            Lieblingsessen: Käse
          </p>
        </div>
        <div className="column it-guys">
          <h3 className="title is-3">Philipp</h3>
          <img
            className="is-rounded"
            src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621552827/pawly/philipp_eh79k2.jpg"
          />
          <p>
            Ideengeber, Supporter, Hundepapa von Jingles
            <br />
            Lieblingsessen: Pizza
          </p>
        </div>
        <div className="column">
          <h3 className="title is-3">Jingles</h3>
          <img
            className="is-rounded"
            src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621552830/pawly/jingles_zmvonn.jpg"
          />
          <p>
            Mischling aus Portugal, King of the castle,Herzensbrecher, happy dog
            <br />
            Lieblingsessen: Alles!
          </p>
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="title is-2">
            ... und drei müde Programmierer letzte Nacht um 1:30
          </h2>
          <img
            className="tired-programmers"
            src="https://res.cloudinary.com/cloud-michelle/image/upload/v1621553572/pawly/Screenshot_2021-05-21_at_01.31.30_ttmrgh.png"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

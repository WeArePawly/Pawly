import React from "react";

export default function Favorites() {
  return (
    <div className="dashboard-content favorites">
      <h3 className="title is-3">In progress... 🤷‍♀️🤷‍♂️</h3>
      <h4 className="title is-4">
        But here is a cute giphy of a puppy as compensation...
      </h4>
      <iframe
        src="https://giphy.com/embed/Y4pAQv58ETJgRwoLxj"
        width="384"
        height="480"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
    </div>
  );
}

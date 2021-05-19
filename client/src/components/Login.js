import React, { useState } from "react";
import { login } from "../services/auth";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password).then((response) => {
      if (response.message) {
        setMessage(response.message);
        setEmail("");
        setPassword("");
      } else {
        console.log(response);
        props.setUser(response);
        props.history.push("/dashboard");
      }
    });
  }

  return (
    <div className="container auth">
      <h2 className="title is-2">Log In</h2>
      <form onSubmit={handleSubmit}>
        <div className="field">
          <p className="control">
            <label class="label" htmlFor="email">
              Email:{" "}
            </label>
            <input
              className="input"
              id="email"
              type="email"
              name="email"
              placeholder="jingles@pawly.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </p>
        </div>
        <label class="label" htmlFor="password">
          Password:{" "}
        </label>
        <div className="field">
          <p className="control">
            <input
              className="input"
              placeholder="Password"
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </p>
        </div>
        <div className="field">
          <p className="control">
            <button type="submit" className="button is-purple">
              Login
            </button>
          </p>
        </div>
        {message && <p className="title is-5">{message}</p>}
      </form>
    </div>
  );
}

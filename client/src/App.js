import './styles/normalize.css';
import './styles/bulma.css';
import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Signup from './components/signup/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Home from './components/home/Home';
import ProtectedRoute from './components/ProtectedRoute';
import Search from './components/search/Search'
import About from './components/About'

export default function App(props) {
  const [user, setUser] = useState(props.user);

  return (
    <div className="App">
      <Navbar user={user} setUser={user => setUser(user)} />
      <Route
        exact path="/"
        render={props => <Home user={user} setUser={user => setUser(user)} {...props} />}
      />
      <Route
        exact path="/about"
        render={props => <About user={user} setUser={user => setUser(user)} {...props} />}
      />
      <Route
        exact path="/training"
        render={props => <Search user={user} setUser={user => setUser(user)} {...props} />}
      />
      <Route
        exact path="/login"
        render={props => <Login user={user} setUser={user => setUser(user)} {...props} />}
      />
      <Route
        exact path="/signup"
        render={props => <Signup user={user} setUser={user => setUser(user)} {...props} />}
      />
      <ProtectedRoute
        path='/dashboard'
        user={user}
        component={Dashboard}
        redirectPath='/login'
      />
    </div>
  )
}

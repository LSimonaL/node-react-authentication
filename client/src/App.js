import React from 'react';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFish } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import PrivateRoute from 'react-private-route';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Profile from './components/Profile';
import Home from './components/Home';
import { PrivateRoute } from './components/PrivateRoute';

function App() {
  return (
    <Router>
        <div className="App">
        <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link className="fish" to={"/"}><FontAwesomeIcon icon={faFish} size = '3x'/></Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Signup"}>Sign up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/Contact"}>Contact us</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

          <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route path="/Login"component={(props) => <Login {...props} />}></Route>
              <Route path="/Signup"component={(props) => <Signup {...props} />}></Route>
              <Route path="/Contact"component={(props) => <Contact {...props} />}></Route>
              <PrivateRoute path="/Profile" component={(props) => <Profile {...props} />} />
          </Switch>
        </div>
      </Router>
  );
}


export default App;

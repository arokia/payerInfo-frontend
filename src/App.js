import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Payer from "./components/Payer";
import PayerList from "./components/PayerDetails";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <nav className="navbar  navbar-expand-md navbar-dark bg-dark">
            <div
              className="collapse navbar-collapse "
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto justify-content-center d-flex flex-fill">
                <li className="nav-item">
                  <Link to={"/create"} className="nav-link">
                    Payer Config
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to={"/list"} className="nav-link">
                    Payer List
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
          <br />
          <Switch>
            <Route exact path="/" component={Payer} />
            <Route path="/create" component={Payer} />
            <Route path="/list" component={PayerList} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

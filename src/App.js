import React, { Component } from 'react';
import { Route, BrowserRouter as Router, Link } from "react-router-dom";
import HomePage from './pages/HomePage';
import Invoice from './pages/invoice';

class App extends Component {

  render() {
    return (
      <div className="App">
       <Router>
        <div>
          <nav>
            <ul>
              <li>
                <Link to="/">HomePage</Link>
              </li>
              <li>
                <Link to="/invoice/">Invoice</Link>
              </li>
            </ul>
          </nav>
        </div>
      </Router>
        <Route path="/" component={HomePage} />
        <Route path="/invoice/" component={Invoice} />
      
      </div>
    );
  }
}

export default App;

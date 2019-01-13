import React, { Component } from "react";
import { Link } from "react-router-dom";
class Sidebar extends Component {
  render() {
    return (
      <div id="sidebar">
        <header className="App">
          <h5>
            <Link to="/">
              9JS<span className={"logo"}>.WarsawJs</span>
            </Link>
          </h5>
          <nav>
            <ul>
              <li>
                <Link to="/">Home page</Link>
              </li>
              <li>
                <Link to="/favourite">My favourite</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    if (this.prompt) window.promptWindow.prompt();
                  }}
                  id={"installApp"}
                >
                  Install our application
                </button>
              </li>
            </ul>
          </nav>
        </header>
      </div>
    );
  }
}

export default Sidebar;

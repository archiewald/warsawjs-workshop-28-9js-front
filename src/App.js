import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import PostList from "./PostList";
import PostFavList from "./PostFavList";
import "./App.css";

class App extends Component {
  state = {
    internetOnline: true,
    newServiceWorker: false
  };

  componentDidMount() {
    if (!navigator.onLine) {
      this.setState({
        internetOnline: false
      });
    }

    window.addEventListener("offline", () => {
      this.setState({
        internetOnline: false
      });
    });

    window.addEventListener("online", () => {
      this.setState({
        internetOnline: true
      });
    });

    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      window.promptWindow = e;
    });

    // if (navigator.serviceWorker) {
    //   navigator.serviceWorker
    //     .register("/sw.js")
    //     .then(sw => {
    //       if (sw.waiting) {
    //         this.newWorker = sw.waiting;
    //         console.log("waiting for new SW");
    //         this.setState({
    //           newServiceWorker: true
    //         });
    //       }
    //       console.log("SW registered");
    //       console.log({ sw });
    //     })
    //     .catch(() => {
    //       console.log("error");
    //     });
    // }
  }

  render() {
    return (
      <div className="App">
        <div id="warnings">
          {this.state.newServiceWorker && (
            <div id={"update_warning"}>
              <button
                onClick={() => {
                  this.newWorker.postMessage({ action: "skipWaiting" });
                  window.location.reload();
                }}
              >
                New service
              </button>
            </div>
          )}
          {!this.state.internetOnline && (
            <div id={"internet_warning"}>You haven't got connection</div>
          )}
        </div>
        <BrowserRouter>
          <div>
            <Sidebar />
            <Switch>
              <Route exact path="/" component={PostList} />
              <Route exact path="/favourite" component={PostFavList} />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

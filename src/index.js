import React from "react";
import { Router, Redirect } from "react-router";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import "./index.css";
import App from "components/App";
import Chart from "components/Chart";
import NotFound from "components/NotFound";
import { Switch, Route } from "react-router-dom";
import * as serviceWorker from "./serviceWorker";

ReactDOM.render(
  <React.StrictMode>
    <Router history={createBrowserHistory()}>
      <div style={{ padding: 5, display: "flex", height: 100 }}>
        <div
          style={{
            paddingLeft: 10,
            width: "50%",
            height: "100%",
            display: "flex",
          }}
        >
          <Link
            to="/map"
            style={{
              textDecoration: "none",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#e9d9d9",
            }}
          >
            Bản đồ VN
          </Link>
        </div>
        <div
          style={{
            paddingLeft: 10,
            width: "50%",
            height: "100%",
            display: "flex",
          }}
        >
          <Link
            to="/stats"
            style={{
              textDecoration: "none",
              width: "100%",
              height: "100%",
              justifyContent: "center",
              display: "flex",
              alignItems: "center",
              textAlign: "center",
              backgroundColor: "#e9d9d9",
            }}
          >
            Đồ thị số ca mắc COVID
          </Link>
        </div>
      </div>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/map" />} />
        <Route path="/map" component={App} exact />
        <Route path="/stats" component={Chart} exact />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

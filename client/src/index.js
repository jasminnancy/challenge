import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  useLocation,
  useNavigate,
} from "react-router-dom";
import App from "./App";
import { QueryParamProvider } from "use-query-params";

import "./index.css";
import { initializeApp } from "firebase/app";

initializeApp({
  apiKey: "AIzaSyCZrQPR6s_PRpKJcmdmvonTngE1S6o0yM4",
  authDomain: "alex-challenge.firebaseapp.com",
  projectId: "alex-challenge",
  storageBucket: "alex-challenge.appspot.com",
  messagingSenderId: "630471411581",
  appId: "1:630471411581:web:6ecd422ac6b01972db6e14",
});

const RouteAdapter = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adaptedHistory = React.useMemo(
    () => ({
      replace(location) {
        navigate(location, { replace: true, state: location.state });
      },
      push(location) {
        navigate(location, { replace: false, state: location.state });
      },
    }),
    [navigate]
  );
  return children({ history: adaptedHistory, location });
};

ReactDOM.render(
  <Router>
    <QueryParamProvider ReactRouterRoute={RouteAdapter}>
      <App />
    </QueryParamProvider>
  </Router>,
  document.getElementById("root")
);

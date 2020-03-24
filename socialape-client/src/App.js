import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import themeFile from "./utils/themeFile";
import jwtDecode from "jwt-decode";
import AuthRoute from "./utils/AuthRoute";

import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED }from './redux/types';
import {logoutUser, getUserData} from './redux/actions/userAction';

// Pages
import Home from "./pages/home";
import Login from "./pages/login";
import Signup from "./pages/signup";

// Components
import Navbar from "./components/Navbar";

import "./App.css";
import axios from "axios";

const theme = createMuiTheme(themeFile);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    store.dispatch(logoutUser());
  } else {
    store.dispatch({
      type: SET_AUTHENTICATED
    })
    axios.defaults.headers.common['Authorization'] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <div className="App">
          <Router>
            <Navbar />
            <div className="container">
              <Switch>
                <Route path="/" component={Home} exact />
                <AuthRoute
                  path="/login"
                  component={Login}
                />
                <AuthRoute
                  path="/signup"
                  component={Signup}
                />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    </ThemeProvider>
  );
}

export default App;

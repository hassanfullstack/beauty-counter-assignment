import React, { Component } from "react";
import {
    BrowserRouter,
    Route,
    Routes,
    Navigate,
  } from "react-router-dom";
import Login from "./components/domain/account/login";
import Fruit from "./components/domain/fruits/fruit";
import { createBrowserHistory } from "history";
import { WebStorage, WebStorageNames} from "./utils";

class AppRoutes extends Component {
  constructor(props) {
    super(props);
    let isUserloggedIn = WebStorage.getLocalStore(WebStorageNames.UserLoggedIn);
    this.state = {
      isLoggedIn: isUserloggedIn ?? false,
    };
  }
  getAuthInfo() {
    return WebStorage.getLocalStore(WebStorageNames.AuthInfo);
  }
  authenticate(SuccessComponent, FailComponentName) {
    const { isLoggedIn } = this.state;
    const loggedUser = this.getAuthInfo();
    if (loggedUser !== null || isLoggedIn) {
      return <SuccessComponent />;
    }
    return <Navigate to={FailComponentName} />;
  }

  notAuthenticate(SuccessComponentName, FailComponent) {
    const { isLoggedIn } = this.state;
    const loggedUser = this.getAuthInfo();
    return loggedUser !== null || isLoggedIn ? (
      <Navigate to={SuccessComponentName} />
    ) : (
      <FailComponent />
    );
  }
  render() {
    const history = createBrowserHistory();
    return (
      <BrowserRouter history={history}>

              <Routes>
               
              <Route
              exact
              path="/"
              element={this.notAuthenticate('/fruit', Login)}
            />
            <Route
            exact
            path={'/fruit'}
            element={this.authenticate(Fruit, "/")}
          />
                
              </Routes>
      </BrowserRouter>
    );
  }
}

export default AppRoutes;
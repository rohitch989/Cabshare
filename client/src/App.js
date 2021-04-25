import React from "react";
import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Welcome from "./components/Welcome/Welcome";
import DriverSignInForm from "./components/Driver/DriverSignUp_Login-Form/Driver";
import RiderInfo from "./components/Rider/RiderInfo";
import { Provider } from "react-redux";
import store from "./store/store";
import DriverInfo from "./components/Driver/DriverSignUp_Login-Form/Driverinfo";


function App() {


  return (
    <div>
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Welcome} />
            <Route path="/cabshare" exact component={Welcome} />
            <Route path="/cabshare/driver" exact component={DriverSignInForm} />
            <Route path="/cabshare/auth/rider/" exact component={RiderInfo} />
            <Route path="/cabshare/auth/driver" exact component={DriverInfo} />

          </Switch>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;

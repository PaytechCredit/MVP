import React, { useEffect } from "react";
// Router Imports
import { Router, Route, Switch } from "react-router-dom";
import history from "utils/history";
// Redux component connect
import { connect } from "react-redux";
// Importing redux actions
import { handleIsUserAuthenticated, validateAuthToken } from "_actions/auth";
import { resetApplicationStep } from "_actions/application";
// Local Components
import Home from "pages/Home";
import Dashboard from "pages/Dashboard";
import Page404 from "pages/static/Page404";
// Auth Components
import Register from "pages/auth/Register";
import LogIn from "pages/auth/LogIn";
import EmailVerificationSuccess from "pages/auth/EmailVerificationSuccess";
import VerifyEmail from "pages/auth/VerifyEmail";
import VerifyPhone from "pages/auth/VerifyPhone";
import ForgotPassword from "pages/auth/ForgotPassword";
// Static Components
import About from "pages/static/About";
// Application Process Component pages
import ApplicationWalkThrough from "pages/ApplicationWalkThrough";
import ApplicationSuccess from "pages/static/ApplicationSuccess";
import ApplicationUpdated from "pages/static/ApplicationUpdated";
import NewApplication from "pages/NewApplication";
// Layouts
import Navbar from "components/Navbar";
// Private Route For Auth redirection.
import PrivateRoute from "containers/PrivateRoute";
import AuthRoute from "containers/AuthRoute";
import ApplicationDraft from "pages/static/ApplicationDraft";
import ResetPasswordSuccess from "pages/static/ResetPasswordSuccess";

function App(props) {
  /**
   * Similar to componentDidMount and componentDidUpdate:
   * Checking for the user token availability and changing the isAuthenticated flag value.
   */
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      props.dispatch(validateAuthToken());
      props.dispatch(handleIsUserAuthenticated(true));
      // props.dispatch(resetApplicationStep());
    } else {
      props.dispatch(handleIsUserAuthenticated(false));
    }
  }, [sessionStorage.getItem("token")]);

  // Rending Routes
  return (
    <Router history={history}>
      <div>
        <Navbar />

        <div className="app-container">
          <Switch>
            <Route path="/" name="home" exact component={Home} />
            <Route path="/about/" name="about" exact component={About} />
            <AuthRoute
              path="/register/"
              name="register"
              exact
              component={Register}
            />
            <AuthRoute path="/login/" name="login" exact component={LogIn} />
            <AuthRoute
              path="/verify-success/"
              exact
              component={EmailVerificationSuccess}
            />
            <AuthRoute path="/verify-email/" exact component={VerifyEmail} />
            <AuthRoute path="/verify-phone/" exact component={VerifyPhone} />
            <AuthRoute
              path="/forgot-password/"
              exact
              component={ForgotPassword}
            />
            <Route
              path="/forgot-password/success"
              exact
              component={ResetPasswordSuccess}
            />
            <PrivateRoute
              path="/application/"
              name="application"
              exact
              component={NewApplication}
            />
            <PrivateRoute
              path="/application/:application_id"
              exact
              component={ApplicationWalkThrough}
            />
            <PrivateRoute
              path="/application-success"
              name="application-success"
              exact
              component={ApplicationSuccess}
            />
            <PrivateRoute
              path="/application-updated"
              name="application-updated"
              exact
              component={ApplicationUpdated}
            />
            <PrivateRoute
              path="/application-draft"
              name="application-draft"
              exact
              component={ApplicationDraft}
            />
            <PrivateRoute path="/dashboard/" exact component={Dashboard} />
            <Route component={Page404} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

function mapStateToProps(state) {
  return { auth: state.auth };
}

export default connect(mapStateToProps)(App);

import React from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';

// Components
import { connect } from 'react-redux';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import SignUp from './components/SignUp/SignUp';
import SignIn from './components/SignIn/SignIn';
import EmailVerification from './components/EmailVerification/EmailVerification';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './pages/Dashboard/Dashboard';
import { authCheckState } from './redux/actions/auth';
import ResendVerifyCode from './components/EmailVerification/ResendVerifyCode';

export class App extends React.Component {
  componentDidMount() {
    this.props.attemptSignIn();
  }

  render() {
    return (
      <Router>
        <Header />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/signin" render={() => (this.props.loggedIn ? <Redirect to="/" /> : <SignIn />)} />
          <Route path="/signup" render={() => (this.props.loggedIn ? <Redirect to="/" /> : <SignUp />)} />
          <Route path="/verify" render={() => (this.props.loggedIn ? <Redirect to="/" /> : <EmailVerification />)} />
          <Route
            path="/resend-verify-code"
            render={() => (this.props.loggedIn ? <Redirect to="/" /> : <ResendVerifyCode />)}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.auth.currentUser !== null,
});

const mapDispatchToProps = (dispatch) => ({
  attemptSignIn: () => dispatch(authCheckState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

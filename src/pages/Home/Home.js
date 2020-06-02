import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './Home.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import SignUp from '../../components/SignUp/SignUp';
import SignIn from '../../components/SignIn/SignIn';
import EmailVerification from '../../components/EmailVerification/EmailVerification';
import NotFound from '../../components/NotFound/NotFound';
import Hero from '../../components/Hero/Hero';
import Info from '../../components/Info/Info';
import ResendVerifyCode from '../../components/EmailVerification/ResendVerifyCode';
import RequestLink from '../../components/PasswordReset/RequestLink';
import PasswordReset from '../../components/PasswordReset/PasswordReset';

const Home = (props) => (
  <>
    <Header />
    <Switch>
      <Route
        path="/"
        exact
        render={() => (
            <>
              <Hero />
              <Info />
            </>
        )}
      />
      <Route path="/signin" render={() => (props.loggedIn ? <Redirect to="/" /> : <SignIn />)} />
      <Route path="/signup" render={() => (props.loggedIn ? <Redirect to="/" /> : <SignUp />)} />
      <Route path="/verify" render={() => (props.loggedIn ? <Redirect to="/" /> : <EmailVerification />)} />
      <Route path="/resend-verify-code" render={() => (props.loggedIn ? <Redirect to="/" /> : <ResendVerifyCode />)} />
      <Route path="/forgot-password" render={() => (props.loggedIn ? <Redirect to="/" /> : <RequestLink />)} />
      <Route path="/reset/:token" render={() => (props.loggedIn ? <Redirect to="/" /> : <PasswordReset />)} />
      <Route component={NotFound} />
    </Switch>
    <Footer />
  </>
);

export default Home;

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheckState } from './redux/actions/auth';

// Components
import Home from './pages/Home/Home';
import Dashboard from './pages/Dashboard/Dashboard';

export class App extends React.Component {
  componentDidMount() {
    this.props.attemptSignIn();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/" render={() => <Home loggedIn={this.props.loggedIn} />} />
        </Switch>
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

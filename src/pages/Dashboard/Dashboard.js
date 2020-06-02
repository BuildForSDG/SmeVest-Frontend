import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter } from 'react-router-dom';
import DashNav from '../../components/DashNav/DashNav';
import Profile from '../../components/Profile/Profile';
import EditProfile from '../../components/Profile/EditProfile';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this._isMounted = false;
  }

  componentDidMount() {
    this._isMounted = true;
    if (!this.props.currentUser) {
      this.props.history.push('/');
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    return (
      <React.Fragment>
        <DashNav />
        <Switch>
          <Route path={`${this.props.match.url}/profile`} exact component={Profile} />
          <Route
            path={`${this.props.match.url}/profile/edit`}
            render={() => <EditProfile currentUser={this.props.currentUser} />}
          />
        </Switch>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

export default withRouter(connect(mapStateToProps, null)(Dashboard));

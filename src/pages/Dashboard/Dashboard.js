import React from 'react';
import { connect } from 'react-redux';

const Dashboard = () => <h1>Dashboard</h1>;

const mapStateToProps = ({ auth }) => ({
  currentUser: auth.currentUser,
});

export default connect(mapStateToProps, null)(Dashboard);

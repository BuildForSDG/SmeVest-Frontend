import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="page-not-found">
    <h1 className="title">404</h1>
    <div className="desc">The Page you&apos;re looking for was not found.</div>
    <Link to="/">
      <button className="btn" type="primary" size="large">
        Go Back
      </button>
    </Link>
  </div>
);

export default NotFound;

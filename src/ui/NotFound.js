import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code; // eslint-disable-line no-param-reassign
      }
      return children;
    }}
  />
);
Status.propTypes = {
  code: PropTypes.oneOf([404, 301, 302]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default () => (
  <Status code={404}>
    <h1>Not Found</h1>
  </Status>
);

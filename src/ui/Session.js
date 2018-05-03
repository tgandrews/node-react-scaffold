import React from 'react';
import PropTypes from 'prop-types';

const Session = ({
  match: {
    params: { id },
  },
}) => <h1>Session: {id}</h1>;

Session.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Session;

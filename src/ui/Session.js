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
      id: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Session;

import React from 'react';
import PropTypes from 'prop-types';

const Loading = ({ error, retry, pastDelay }) => {
  if (error) {
    return (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    return <div>Loading...</div>;
  }
  return null; // eslint-disable-line no-null/no-null
};

Loading.propTypes = {
  error: PropTypes.bool,
  retry: PropTypes.func.isRequired,
  pastDelay: PropTypes.bool.isRequired,
};

Loading.defaultProps = {
  error: false,
};

export default Loading;

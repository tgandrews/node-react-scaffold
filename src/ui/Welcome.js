import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const query = gql`
  {
    browsers(top: 1) {
      name
    }
  }
`;

export default () => (
  <div>
    <Query query={query}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error</p>;
        return (
          <div>
            <h1>Welcome</h1>
            <p>Most popular browser: {data.browsers[0].name}</p>
            <Link to="/session/1">Session link</Link>
          </div>
        );
      }}
    </Query>
  </div>
);

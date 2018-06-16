import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Loadable from '@7rulnik/react-loadable';

import App from '../ui/App';

window.main = () => {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <ApolloProvider
        client={
          new ApolloClient({
            uri: '/graphql',
            link: createHttpLink({ uri: '/graphql' }),
            cache: new InMemoryCache().restore(window.__APOLLO_STATE__), // eslint-disable-line no-underscore-dangle
          })
        }>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ApolloProvider>,
      document.getElementById('content')
    );
  });
};

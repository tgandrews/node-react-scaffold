import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

import App from '../ui/App';

const container = (
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
  </ApolloProvider>
);

hydrate(container, document.getElementById('content'));

import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from 'react-loadable';

import Welcome from './Welcome';
import NotFound from './NotFound';
import Loading from './components/Loading';

const LoadableSession = Loadable({
  loader: () => import('./Session'),
  loading: Loading,
});

export default () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/session/:id" component={LoadableSession} />
    <Route exact={false} component={NotFound} />
  </Switch>
);

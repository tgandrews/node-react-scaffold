import React from 'react';
import { Switch, Route } from 'react-router';
import Loadable from '@7rulnik/react-loadable';

import Loading from './components/Loading';

const LoadableWelcome = Loadable({
  loader: () => import(/* webpackChunkName: "Welcome" */ './Welcome'),
  loading: Loading,
});
const LoadableSession = Loadable({
  loader: () => import(/* webpackChunkName: "Session" */ './Session'),
  loading: Loading,
});
const LoadableNotFound = Loadable({
  loader: () => import(/* webpackChunkName: "NotFound" */ './NotFound'),
  loading: Loading,
});

export default () => (
  <Switch>
    <Route path="/" exact component={LoadableWelcome} />
    <Route path="/session/:id" component={LoadableSession} />
    <Route exact={false} component={LoadableNotFound} />
  </Switch>
);

import React from 'react';
import { Switch, Route } from 'react-router';

import Welcome from './Welcome';
import Session from './Session';
import NotFound from './NotFound';

export default () => (
  <Switch>
    <Route path="/" exact component={Welcome} />
    <Route path="/session/:id" component={Session} />
    <Route exact={false} component={NotFound} />
  </Switch>
);

import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../ui/App';

const container = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

hydrate(container, document.getElementById('content'));

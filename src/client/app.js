import React from 'react';
import ReactDom from 'react-dom';
import { Router } from 'react-router';

import '../setup';
import routes from './routes/rootRoute';
import history from './routes/history';

if (typeof window !== 'undefined') {
  ReactDom.render((
    <Router
      history={ history }
      routes={ routes }
    />
  ), document.getElementById('app'));
}

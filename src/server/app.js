import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Html from './html';

function App(request, response) {
  const html = ReactDOMServer.renderToStaticMarkup(
    <Html title="SoftRobot" />
  );
  response.send('<!DOCTYPE html>' + html);
}

export default App;

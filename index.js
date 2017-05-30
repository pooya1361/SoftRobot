import path from 'path';
import express from 'express';

import appEntrance from './src/server/app';

const DEFAULT_PORT = 3000;

const app = express();

const publicPath = path.join(__dirname, 'public');
app.use('/public', express.static(publicPath));
app.use('/', appEntrance);

app.set('port', process.env.PORT || DEFAULT_PORT);

function runner() {
  console.log('The main server is running at http://localhost:' + this.address().port);
}
app.listen(app.get('port'), runner);

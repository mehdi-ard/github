import './polyfill';
import React from 'react';
import * as serviceWorker from './serviceWorker';
import ReactDOM from 'react-dom';
import App from './app';
import Jss from './providers/jss';
import Theme from './providers/theme';
import './states';

async function boot() {

  ReactDOM.render(
    <Jss>
      <Theme>
        <App />
      </Theme>
    </Jss>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
}

boot();

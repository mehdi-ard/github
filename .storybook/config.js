import React from 'react';
import Jss from '../src/providers/jss';
import Theme from '../src/providers/theme';
import { configure, addDecorator } from '@storybook/react';
import { initializeRTL } from 'storybook-addon-rtl';

initializeRTL();

const req = require.context('../src', true, /story.jsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator(storyFn => {
  console.log('addDecorator');
  return (
    <Jss>
      <Theme>{storyFn()}</Theme>
    </Jss>
  );
});

configure(loadStories, module);

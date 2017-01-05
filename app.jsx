// client side entry point

import React from 'react';
import { render } from 'react-dom';
import TweetsApp from './components/TweetsApp';

// grab initial state passed from server
let initialState = JSON.parse(
  document.getElementById('initial-state').innerHTML
);

// Render components in sync w/ server
render(
  <TweetsApp tweets={initialState} />,
  document.getElementById('react-app')
);
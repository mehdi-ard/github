import React from 'react';
import renderer from 'react-test-renderer';
import Paper from '.';

it('renders with elevation', () => {
  expect(renderer.create(<Paper elevation={1}>dcdc</Paper>).toJSON()).toMatchSnapshot();
});

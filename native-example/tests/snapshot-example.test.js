
import React from 'react';
import Example from '../ExampleComponent.jsx';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Example ClickClock={'action'} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

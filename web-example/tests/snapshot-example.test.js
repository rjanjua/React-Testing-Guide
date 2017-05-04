import React from 'react';
import Example from '../src/components/Example';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer.create(
    <Example action={'action'} propogatedAction={'propogated'}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

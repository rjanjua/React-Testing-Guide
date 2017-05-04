import React from 'react';
import {mount} from 'enzyme';
import Example from '../src/components/Example'
import assert from 'assert';
import sinon from 'sinon';

describe('enzyme web test', () => {
  var fn;
  var wrapper;
  var didMount;

  beforeAll( () => {
    fn = sinon.spy();
    sinon.spy(Example.prototype, 'componentDidMount');
    wrapper =  mount(<Example propogatedAction={fn} />);
  });

  it('mount renders all layers', () => {

    const hasNested = wrapper.find('Nested').length > 0;   
    const hasNested2 = wrapper.find('Nested2').length > 0;
    
    assert(hasNested);
    assert(hasNested2);
  });

  it('can simulate events, and propogate them down', () => {
    wrapper.find('Nested2').simulate('click');
    assert(fn.calledOnce);
  });

  it('can trigger componentDidMount etc. ', () => {
    assert(Example.prototype.componentDidMount.calledOnce);
  });

});
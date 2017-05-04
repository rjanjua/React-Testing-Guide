import React from 'react';
import {shallow} from 'enzyme';
import Example from '../src/components/Example'
import assert from 'assert';
import sinon from 'sinon';

describe('enzyme web test', () => {
  var fn;
  var wrapper;

  beforeAll( () => {
    fn = sinon.spy();
    wrapper =  shallow(<Example action={fn} />);
  });

  it('shallow renders 1 layer deep', () => {

    const hasNested = wrapper.find('Nested').length;   
    const hasNested2 = wrapper.find('Nested2').length;
    
    assert.equal(hasNested, 1);
    assert.equal(hasNested2, 0);
  });

  it('can simulate events', () => {
    wrapper.find('Nested').simulate('click');
    assert(fn.calledOnce);
  });

});
import React from 'react';
import {mount} from 'enzyme';
import {ListView} from 'react-native';
import Example from '../exampleComponent';
import sinon from 'sinon';
import assert from 'assert';

describe('enzyme works with native', () => {

  it('works with mount()', () => {
    const fn = sinon.spy();
    const fn1 = sinon.spy();
    sinon.spy(Example.prototype, 'componentDidMount');
    
    const x = <Example ClickClock={fn} Clicky={fn1}/>;
    const wrapper = mount(x);
    wrapper.simulate('click');

    console.log('mount does render Nested within Example', fn.calledOnce)
    wrapper.find('Nested').forEach(w => console.log('mount does render View within Nested', fn.calledOnce));
    assert(Example.prototype.componentDidMount.calledOnce);
        console.log('onClick?', i)

  });

});
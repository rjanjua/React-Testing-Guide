import React from 'react';
import {shallow, mount} from 'enzyme';
import {ListView} from 'react-native';
import Example from '../exampleComponent';
import sinon from 'sinon';
import assert from 'assert';

describe('enzyme works with native', () => {
  

  it('works with shallow()', () => {
    var i = 0;
    const x = <Example ClickClock={() => i += 1 } Clicky={() => i += 1}/>;
    const wrapper = shallow(x);    
    wrapper.simulate('click')
    wrapper.find('Nested').simulate('onClick');
    console.log('shallow does render Nested within Example', wrapper.find('Nested').length)
    console.log('shallow does not render View within Nested', wrapper.find('View').length)
    console.log('onClick?', i)
  });


});
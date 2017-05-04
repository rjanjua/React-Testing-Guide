import React from 'react';
import {shallow} from 'enzyme';
import Example from '../src/components/PropertyBasedExample'
import assert from 'assert';
import { sample, check, generator, property } from 'testcheck';

const inputGenerator = generator.string();

describe('property based component test', () => {

  it('generates valid inputs', () => {
    const result = check(property(inputGenerator, s => {
      wrapper =  mount(<Example input={s} />);
      return wrapper.find(div).first().text != "enter alpha string";
    }))
    console.log(result);
  });

});
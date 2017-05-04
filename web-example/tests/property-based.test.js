import React from 'react';
import {shallow} from 'enzyme';
import assert from 'assert';
import { sample, check, gen, property } from 'testcheck'; // property based testing library

// Component under test
class Example extends React.Component {
  
  // method that will 'regularize' the input. In this case we just square it
  // For this example the important property of 'regularize' is that it makes all input positive
  regularize(input){
    const x = typeof input == "number" && !isNaN(input) ? input : 0.0 ;
    return x*x;
  }

  render() {
    return (
      <div >
        {this.regularize(this.props.input)}
      </div>
    );
  }

}

describe('property based component test', () => {

  it('input must be greater than 0', () => {

    // define property
    // gen.number randomly generates values from -inf to inf and NaN
    const greaterThanZero = property(gen.number, n => {
      //render component with the generated input 
      const wrapper =  shallow(<Example input={n} />);

      //define the property as a predicate
      return parseFloat(wrapper.find('div').first().text()) >= 0;
    });

    // run property test with 1000 samples
    const result = check(greaterThanZero, {numTests: 1000});
      console.log(result);

    if(!result.result){
      console.log(result);
    }
    assert(result.result);
  });

});
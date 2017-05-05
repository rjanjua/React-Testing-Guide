import React, { Component } from 'react';
import {Text, View, ListView } from 'react-native';
import {hook} from 'cavy';

class InteractionComponent extends Component {
  constructor() {
    super();
    this.state = { value: 0};
  }

  increment(by=1){
    this.setState({value: this.state.value + by})
  }

  render() {
    return (
      <View >
        <Text 
          ref={this.props.generateTestHook('InteractionComponent.Text')}
          onPress={() => this.increment()} 
          onLongPress={ () => this.increment(10)}
        >this is {this.state.value}</Text>
      </View>
    );
  }
}

const TestableComponent = hook(InteractionComponent);

class TestApp extends Component{
  constructor(){
    super();
  }
  render() {
    return (
      <View>
        <TestableComponent ref={this.props.generateTestHook('Example')}/>
      </View>
    );
  }
}


export default TestApp;
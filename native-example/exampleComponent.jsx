import React, { Component } from 'react';
import {Text, View, ListView } from 'react-native';

class Example extends Component {
  constructor() {
    super();
    this.state = { i: 0};
  }

  increment(){
    this.setState({i: this.state.i + 1})
  }

  componentDidMount() {}

  render() {
    return (
      <Nested clickety={this.props.ClickClock} onClick={this.props.Clicky}>
        <Text>{this.state.i}</Text>
      </Nested>
    );
  }
}


class Nested extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <View onClick={this.props.clickety}/>
    );
  }
}

export default  Example;
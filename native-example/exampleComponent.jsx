import React, { Component } from 'react';
import {Text, View, ListView } from 'react-native';

class Example extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  render() {
    return (
      <Nested clickety={this.props.ClickClock} onClick={this.props.Clicky}/>
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
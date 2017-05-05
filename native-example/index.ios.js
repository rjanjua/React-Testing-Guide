/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Tester, TestHookStore, hook } from 'cavy';

import AppSpec from './tests/cavy-example.test';

import Example from './InteractionComponent';

const Hooked = hook(Example);
const testHookStore = new TestHookStore();

export default class nativeEestExample extends Component {
  render() {
    return (
      <Tester specs={[AppSpec]} store={testHookStore} waitTime={1000} >  
        <View style={styles.container}>
          <Hooked />
        </View>
      </Tester>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('nativeEestExample', () => nativeEestExample);

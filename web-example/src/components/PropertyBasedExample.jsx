import React, { Component } from 'react';

class PropertyBasedExample extends React.Component {
  
  verify(input){
    const x = "";
    return input.match(/a-zA-Z/) ? input : "enter alpha string";
  }

  render() {
    return (
      <div >
        this.verify(this.props.input)
      </div>
    );
  }

}

module.exports = PropertyBasedExample;
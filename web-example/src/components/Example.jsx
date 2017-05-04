import React, { Component } from 'react';

class Example extends React.Component {
  
  componentDidMount(){

  }

  render() {
    return (
      <div className="Example">
        <Nested onClick={this.props.action} propogatedAction={this.props.propogatedAction}/>
      </div>
    );
  }

}

class Nested extends React.Component {
  
  componentDidMount(){

  }

  render() {
    return (
      <div className="Nested" >
        <Nested2 propogatedAction={this.props.propogatedAction}/>
      </div>
    );
  }

}

class Nested2 extends React.Component {
  
  componentDidMount(){

  }
  
  render() {
    return (
      <div className="Nested2" onClick={this.props.propogatedAction}/>
    );
  }

}

module.exports = Example;
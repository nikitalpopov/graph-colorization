import React from 'react';
import './Error.css';

export class Error extends React.Component {
  render() {
    return (<div style={{ color: "red" }}>{this.props.error}</div>);
  }
}
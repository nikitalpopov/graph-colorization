import { Text } from 'grommet';
import React from 'react';
import './Error.css';

export class Error extends React.Component {
  render = () => (<Text color="status-error" weight="bolder">{this.props.error}</Text>);
}

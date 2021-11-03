import React from 'react';
import { Error } from '../error/Error';
import { Graph } from '../graph/Graph';
import './Container.css';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      colorization: {},
      connectivity: {},
      error: undefined,
      graph: undefined
    };

    this.checkGraph = this.checkGraph.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  render() {
    return (
      <div>
        <input type="text" value={this.state.value} onChange={(event) => this.setValue(event.target.value)} />
        <button disabled={!this.state.value.length} onClick={this.checkGraph}>Check graph</button>
        {this.state.error}
        {this.state.graph}
      </div>
    );
  }

  clearState() {
    this.setState({
      colorization: {},
      connectivity: {},
      error: undefined,
      graph: undefined
    });
  }

  /**
   * Reads passed graph string into state
   */
  handleInput(input) {
    if (!input.length) {
      throw new Error('Incorrect data passed');
    }

    const connections = input.replace('\\n', ',').replace('\n', ',').split(',').map(s => s.trim());
    connections.forEach(connection => {
      const nodes = connection.split('-').map(s => s.trim());
      nodes.forEach((node, i) => {
        if (!this.state.connectivity?.hasOwnProperty(node)) {
          const connectivity = this.state.connectivity;
          const colorization = this.state.colorization;

          connectivity[node] = new Set();
          colorization[node] = null;

          this.setState({ colorization, connectivity });
        }

        if (i > 0) {
          this.addLink(node, nodes[i-1]);
        }

        if (i + 1 < nodes.length) {
          this.addLink(node, nodes[i+1]);
        }
      });
    });
  }

  /**
   * Saves received graph description into state
   */
  setValue(value) {
    this.clearState();

    try {
      this.handleInput(value);
      this.setState({ value });
    } catch (e) {
      this.setState({ error: <Error error={e.message} /> });
      // throw e;
    }
  }

  /**
   * Saves info about links between nodes
   */
  addLink(a, b) {
    const connectivity = this.state.connectivity;
    connectivity[a].add(b);
    this.setState({ connectivity });

    // If node connected to itself, it doesn't satisfy colorization requirements
    if (a === b) {
      throw new Error("Graph with a loop can't be painted");
    }
  }

  /**
   * Applies color to current node. If node is already colored, checks if graph is bipartite (https://en.wikipedia.org/wiki/Bipartite_graph)
   */
  checkNode(currentNode, color) {
    if (this.state.colorization[currentNode] === null) {
      const colorization = this.state.colorization;
      colorization[currentNode] = color;
      this.setState({ colorization });

      Array.from(this.state.connectivity[currentNode]).forEach(node => {
        this.checkNode(node, !color);
      });
    } else if (this.state.colorization[currentNode] !== color) {
      throw new Error(`Node '${currentNode}' can't be painted with one color`);
    }
  }

  /**
   * Checks if graph is connected by iterating nodes with breadth-first search (https://en.wikipedia.org/wiki/Breadth-first_search)
   */
  checkIfConnected() {
    this.checkNode(Object.keys(this.state.connectivity)[0], true);

    if (Object.values(this.state.colorization).some(color => color === null)) {
      throw new Error(`Graph is not connected`);
    }
  }

  checkGraph() {
    try {
      this.checkIfConnected();
      this.setState({ graph: <Graph colorization={this.state.colorization} connectivity={this.state.connectivity} /> });
    } catch (e) {
      this.setState({ error: <Error error={e.props} /> });
      // throw e;
    }
  }
}

import { Button, TextInput } from 'grommet';
import React from 'react';
import { Error } from '../error/Error';
import { Graph } from '../graph/Graph';
import './Container.css';

export class Container extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      /* Inputted graph description */
      value: '',
      /* Info about node colors (since only 2 colors are used, boolean value is mapped to node name) */
      colorization: {},
      /* Info about node links (array of linked node names is mapped to node name) */
      connectivity: {},
      buttonDisabled: true,
      error: undefined,
      graph: undefined
    };

    this.state = {...this.initialState};

    this.checkGraph = this.checkGraph.bind(this);
    this.setValue = this.setValue.bind(this);
  }

  render() {
    return (
      <div>
        <div className="wrapper">
          <div className="input">
            <TextInput
              placeholder="enter graph description"
              onChange={(event) => this.setValue(event.target.value)}
              dropHeight="small"
            />
            {this.state.error}
          </div>
          <Button className="button" disabled={this.state.buttonDisabled} onClick={this.checkGraph} primary label="check graph" />
        </div>
        {this.state.graph}
      </div>
    );
  }

  /**
   * Saves received graph description into state
   */
  async setValue(value) {
    await this.clearState();
    try {
      this.handleInput(value);
      this.setState({ value, buttonDisabled: false });
    } catch (e) {
      await this.clearState();
      this.setState({ error: <Error error={e.props} />, buttonDisabled: true });
      // throw e;
    }
  }

  async clearState() {
    await this.setState({
      colorization: {},
      connectivity: {},
      buttonDisabled: true,
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

  async checkGraph() {
    try {
      this.checkIfConnected();
      this.setState({ graph: <Graph colorization={this.state.colorization} connectivity={this.state.connectivity} /> });
    } catch (e) {
      await this.clearState();
      this.setState({ error: <Error error={e.props} />, buttonDisabled: true });
      // throw e;
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
}

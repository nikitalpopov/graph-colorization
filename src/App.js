import { Anchor, Grommet, Heading, Text } from 'grommet';
import './App.css';
import { Container } from './container/Container';
import { Examples } from './examples/Examples';

const App = () => {
  return (
    <div className="App">
      <Grommet theme={{ global: { focus: { outline: { color: 'brand' } } } }}>
        <Heading className="description">graph colorization 🔵➖🔴</Heading>
        <Text className="description" as="div" maxWidth="900px" size="medium">
          Write a small web application to check if a graph is red-blue colorable.<br />
          A graph is red-blue colorable if two connected nodes have never the same color and the graph is a connected graph. A user should be able to enter a graph in a textarea by typing some paths (a word is a node, a dash an edge and a new line or a comma a separation between paths).
        </Text>

        <Text className="description" as="div" maxWidth="900px" size="small">
          Definitions:<br />
          Connected graph <Anchor href="https://en.wikipedia.org/wiki/Connectivity_(graph_theory)" label="(from Wikipedia)" /><br />
          A graph is said to be connected if every pair of vertices in the graph is connected. This means that there is a path between every pair of vertices. An undirected graph that is not connected is called disconnected. An undirected graph G is therefore disconnected if there exist two vertices in G such that no path in G has these vertices as endpoints. A graph with just one vertex is connected. An edgeless graph with two or more vertices is disconnected.
        </Text>
        <Examples />
        <Container />
      </Grommet>
    </div>
  );
}

export default App;

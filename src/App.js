import './App.css';
import { Container } from './container/Container';
import { Examples } from './examples/Examples';

const App = () => {
  return (
    <div className="App">
      <Examples />
      <Container />
    </div>
  );
}

export default App;

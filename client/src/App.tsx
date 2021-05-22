import { HallOfFame } from './hallOfFame';
import { Intro } from './intro';
import { Container, Canvas } from './components';
import BackgroundImage from './img/bg_3.png';

function App() {
  return (
    <Container style={{ backgroundImage: `url("${BackgroundImage}")` }}>
      <Intro />
      {/* <Canvas id="cvs" /> */}
      <HallOfFame />
    </Container>
  );
}

export default App;

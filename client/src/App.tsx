import { useState } from 'react';
import { Intro } from './intro';
import { Main } from './main';
import { Container, Canvas } from './components';
import BackgroundImage from './img/bg_3.png';

function App() {
  const [displayIntro, setDisplayIntro] = useState(true);
  const [name, setName] = useState('');
  return (
    <Container style={{ backgroundImage: `url("${BackgroundImage}")` }}>
      {displayIntro ? <Intro name={name} setName={setName} setDisplayIntro={setDisplayIntro} /> : <Main name={name} />}
      <Canvas style={{zIndex: 1}} id="cvs" />
      <Canvas style={{zIndex: 2}} id="ocvs" />
    </Container>
  );
}

export default App;

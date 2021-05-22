import { useEffect, useState } from 'react';
import { Intro } from './intro';
import { Main } from './main';
import { Container, Canvas } from './components';
import BackgroundImage from './img/bg_3.png';
import { getHighScores } from './game/utils/api';

function App() {
  useEffect(() => {
    const getRanking = async () => {
      const ranks = await getHighScores();
      setTopRank(ranks);
    };
    getRanking();
  }, []);
  const [displayIntro, setDisplayIntro] = useState(true);
  const [topRank, setTopRank] = useState();
  const [name, setName] = useState('');
  return (
    <Container style={{ backgroundImage: `url("${BackgroundImage}")` }}>
      {displayIntro ? (
        <Intro topRank={topRank} name={name} setName={setName} setDisplayIntro={setDisplayIntro} />
      ) : (
        <Main topRank={topRank} name={name} />
      )}
      <Canvas id="cvs" />
    </Container>
  );
}

export default App;

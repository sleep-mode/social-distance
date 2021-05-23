import { useEffect, useState } from 'react';
import { Intro } from './intro';
import { Main } from './main';
import { Container, Canvas } from './components';
import BackgroundImage from './img/bg_3.png';
import { getHighScores } from './game/utils/api';

function App() {
  const [bestScore, setBestScore] = useState(null);
  const [displayIntro, setDisplayIntro] = useState(true);
  const [topRank, setTopRank] = useState();
  const [name, setName] = useState('');
  const [gameEnded, setGameEnded] = useState(false);
  useEffect(() => {
    const getRanking = async () => {
      const ranks = await getHighScores();
      setTopRank(ranks);
    };
    getRanking();
  }, [gameEnded]);
  return (
    <Container style={{ backgroundImage: `url("${BackgroundImage}")` }}>
      {displayIntro ? (
        <Intro
          topRank={topRank}
          name={name}
          setName={setName}
          setDisplayIntro={setDisplayIntro}
          endGame={setGameEnded}
        />
      ) : (
        <Main
          topRank={topRank}
          name={name}
          bestScore={bestScore}
          setBestScore={setBestScore}
          endGame={setGameEnded}
          gameEnded={gameEnded}
        />
      )}
      <Canvas style={{ zIndex: 1 }} id="cvs" />
      <Canvas style={{ zIndex: 2 }} id="ocvs" />
    </Container>
  );
}

export default App;

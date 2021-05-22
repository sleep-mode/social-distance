import { useState } from 'react';
import { Record } from './record';
import {
  StartImage,
  InfoModal,
  Flex,
  Dim,
  BoldText,
  FormContainer,
  BestRecordModal,
  IntroModal,
  StartButton,
} from './components';
import { startGame } from './game/app';
import useTimer from 'easytimer-react-hook';
import { encodeScore, decodeScore } from './game/utils/helpers';
import { postScore } from './game/utils/api';

const BestRecord = ({ name, bestScore, setIsBestScore }) => {
  return (
    <BestRecordModal>
      <IntroModal>
        <FormContainer width="500px">
          <BoldText style={{ alignSelf: 'center' }}>Best Time:</BoldText>
          <BoldText fontSize="60px" style={{ alignSelf: 'center' }}>
            {bestScore}
          </BoldText>
          <StartButton
            onClick={() => {
              postScore(name, bestScore);
              setIsBestScore(false);
              startGame(name, 'localhost', '5000');
            }}
          >
            Try Again [R]
          </StartButton>
        </FormContainer>
      </IntroModal>
    </BestRecordModal>
  );
};

const Info = ({ title, value, coin = false }) => {
  return (
    <Flex flexDirection="column" mb="12px">
      <BoldText fontSize="20px" style={{ textShadow: '2px 2px 0 #000000' }}>
        {title}
      </BoldText>
      <BoldText fontSize="40px" id={coin ? 'coin-amount' : undefined} style={{ textShadow: '2px 2px 0 #000000' }}>
        {value}
      </BoldText>
    </Flex>
  );
};

export const Main = ({ name, topRank, bestScore, setBestScore }) => {
  const [isBestScore, setIsBestScore] = useState<boolean>(false);
  const [timer] = useTimer({
    precision: 'secondTenths',
  });
  const [displayView, setDisplayView] = useState(true);
  setTimeout(() => {
    timer.start();
    setDisplayView(false);
  }, 3000);
  /* -> onGameEnd
    const currScore = timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])
    if (encodeScore(currScore) > encodeScore(bestScore)) {
      setBestScore(currScore);
      setIsBestScore(true);
    }

  */
  return (
    <div>
      {isBestScore && <BestRecord name={name} bestScore={bestScore} setIsBestScore={setIsBestScore} />}
      {displayView && <Dim />}
      <InfoModal left="0%">
        <Flex flexDirection="column" padding="30px">
          <Info title="Nickname" value={name} />
          <Info title="Time" value={timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])} />
          <Info
            title="Best Time"
            value={bestScore ?? timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])}
          />
          <Info title="Coin" value={'0'} coin />
        </Flex>
      </InfoModal>
      <InfoModal right="0%" padding="10px">
        <Flex flexDirection="column" margin="10px 10px">
          <BoldText fontSize="20px">{'Leaderboard'}</BoldText>
          <Flex flexDirection="column" mt="20px">
            {topRank?.map((record: { name: string; time: string }, idx: number) => {
              return <Record key={idx} rank={idx + 1} id={record.name} time={record.time} />;
            })}
          </Flex>
        </Flex>
      </InfoModal>
      <StartImage />
    </div>
  );
};

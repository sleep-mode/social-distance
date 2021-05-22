import { useEffect, useState } from 'react';
import { Record } from './record';
import {
  StartImage,
  InfoModal,
  Flex,
  BoldText,
  FormContainer,
  BestRecordModal,
  IntroModal,
  StartButton,
} from './components';
import { startGame } from './game/app';
import useTimer from 'easytimer-react-hook';

const BestRecord = ({ name, setBestRecord }) => {
  return (
    <BestRecordModal>
      <IntroModal>
        <FormContainer width="500px">
          <BoldText style={{ alignSelf: 'center' }}>Best Time:</BoldText>
          <BoldText fontSize="60px" style={{ alignSelf: 'center' }}>
            12:03:03
          </BoldText>
          <StartButton
            onClick={() => {
              startGame(name, 'localhost', '5000');
              setBestRecord(false);
            }}
          >
            Try Again [R]
          </StartButton>
        </FormContainer>
      </IntroModal>
    </BestRecordModal>
  );
};

export const Main = ({ name, topRank }) => {
  const [bestRecord, setBestRecord] = useState<boolean>(false);
  const [timer] = useTimer({
    precision: 'secondTenths',
  });
  setTimeout(() => {
    timer.start();
  }, 3000);

  return (
    <div>
      {bestRecord && <BestRecord name={name} setBestRecord={setBestRecord} />}
      <InfoModal left="0%">
        <Flex flexDirection="column" padding="30px">
          <BoldText fontSize="20px">{'Nickname'}</BoldText>
          <BoldText fontSize="40px">{name}</BoldText>
          <BoldText fontSize="20px">{'Time'}</BoldText>
          <BoldText fontSize="40px">{timer.getTimeValues().toString(['minutes', 'seconds', 'secondTenths'])}</BoldText>
          <BoldText fontSize="20px">{'Best Time'}</BoldText>
          <BoldText fontSize="40px">{'--:--:-'}</BoldText>
          <BoldText fontSize="20px">{'Coin'}</BoldText>
          <BoldText fontSize="40px">{'???'}</BoldText>
        </Flex>
      </InfoModal>
      <InfoModal right="0%" padding="10px">
        <Flex flexDirection="column">
          <BoldText fontSize="20px">{'Leaderboard'}</BoldText>
          {topRank?.map((record: { name: string; score: string }, idx: number) => {
            return <Record key={idx} rank={idx + 1} id={record.name} time={record.score} />;
          })}
        </Flex>
      </InfoModal>
      <StartImage />
    </div>
  );
};

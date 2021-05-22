import { useState } from 'react';
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

const leaderBoard = [
  // add api
  { id: 'Dawoon', time: '12:12:12' },
  { id: 'Karl', time: '11:11:11' },
  { id: 'Jay', time: '10:10:10' },
  { id: 'EuiTae', time: '9:9:9' },
  { id: 'Joseph', time: '8:8:8' },
  { id: 'Dawoon', time: '12:12:12' },
  { id: 'Karl', time: '11:11:11' },
  { id: 'Jay', time: '10:10:10' },
  { id: 'EuiTae', time: '9:9:9' },
  { id: 'Joseph', time: '8:8:8' },
  { id: 'Dawoon', time: '12:12:12' },
  { id: 'Karl', time: '11:11:11' },
];
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

export const Main = ({ name }) => {
  const [bestRecord, setBestRecord] = useState<boolean>(false);
  return (
    <div>
      {bestRecord && <BestRecord name={name} setBestRecord={setBestRecord} />}
      <InfoModal left="0%">
        <Flex flexDirection="column" padding="30px">
          <BoldText fontSize="20px">{'Nickname'}</BoldText>
          <BoldText fontSize="40px">{name}</BoldText>
          <BoldText fontSize="20px">{'Time'}</BoldText>
          <BoldText fontSize="40px">{'00:00:00'}</BoldText>
          <BoldText fontSize="20px">{'Best Time'}</BoldText>
          <BoldText fontSize="40px">{'10:00:09'}</BoldText>
          <BoldText fontSize="20px">{'Coin'}</BoldText>
          <BoldText fontSize="40px">{'120'}</BoldText>
        </Flex>
      </InfoModal>
      <InfoModal right="0%" padding="10px">
        <Flex flexDirection="column">
          <BoldText fontSize="20px">{'Rank'}</BoldText>
          {leaderBoard.slice(0, 9).map((record: { id: string; time: string }, idx: number) => {
            return <Record key={idx} rank={idx + 1} id={record.id} time={record.time} />;
          })}
        </Flex>
      </InfoModal>
      <StartImage />
    </div>
  );
};

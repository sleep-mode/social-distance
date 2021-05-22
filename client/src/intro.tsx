import { useState, useCallback } from 'react';
import {
  BoldText,
  IntroModal,
  LogoImage,
  WideContainer,
  FormContainer,
  StyledInput,
  StartButton,
  TeamText,
  Flex,
} from './components';
import { Record } from './record';
import { startGame } from './game/app';
const leaderBoard = [
  { id: 'Dawoon', time: '12:12:12' },
  { id: 'Karl', time: '11:11:11' },
  { id: 'Jay', time: '10:10:10' },
  { id: 'EuiTae', time: '9:9:9' },
  { id: 'Joseph', time: '8:8:8' },
];

export const Intro = () => {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5000');
  const [name, setName] = useState('');

  const handleStart = useCallback(() => {
    startGame(name, host, port);
  }, [host, port, name]);

  return (
    <WideContainer height="60vh">
      <LogoImage />
      <TeamText>Team_SleepMode</TeamText>
      <IntroModal>
        <FormContainer width="500px">
          <BoldText>Nickname</BoldText>
          <StyledInput
            autoFocus={true}
            placeholder={'닉네임을 적어주세요'}
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <StartButton onClick={handleStart}>START</StartButton>
          <BoldText>Ranking</BoldText>
          {leaderBoard.map((record: { id: string; time: string }, idx: number) => {
            return <Record key={idx} rank={idx + 1} id={record.id} time={record.time} />;
          })}
        </FormContainer>
      </IntroModal>
    </WideContainer>
  );
};

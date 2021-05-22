import { useCallback } from 'react';
import {
  BoldText,
  IntroModal,
  LogoImage,
  WideContainer,
  FormContainer,
  StyledInput,
  StartButton,
  TeamText,
  JunctionText,
  Flex,
} from './components';
import { Record } from './record';
import { startGame } from './game/app';

export const Intro = ({ name, setName, setDisplayIntro, topRank }) => {
  const handleStart = useCallback(() => {
    setTimeout(() => {
      startGame(name, 'localhost', '5000');
    }, 3000);
  }, [name]);

  return (
    <WideContainer height="60vh">
      <JunctionText>JunctionX Seoul x aws</JunctionText>
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
            onKeyPress={e => {
              if (e.key === 'Enter') {
                !name && setName('후치');
                handleStart();
                setDisplayIntro(false);
              }
            }}
          />
          <StartButton
            onClick={() => {
              !name && setName('후치');
              handleStart();
              setDisplayIntro(false);
            }}
          >
            START
          </StartButton>
          <BoldText>{'Leaderboard'}</BoldText>
          <Flex flexDirection="column" mt="15px">
            {topRank?.map((record: { name: string; score: string }, idx: number) => {
              return <Record key={idx} rank={idx + 1} id={record.name} time={record.score} />;
            })}
          </Flex>
        </FormContainer>
      </IntroModal>
    </WideContainer>
  );
};

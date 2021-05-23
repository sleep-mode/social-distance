import { useCallback, useState } from 'react';
import {
  Dim,
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
  CharacterBox,
  LeftButton,
  RightButton,
} from './components';
import { Record } from './record';
import { startGame } from './game/app';
import Taco from './img/Taco.png';
import Semo from './img/Semo.png';
import Seji from './img/Seji.png';
import Nabi from './img/Nabi.png';
import Cana from './img/Cana.png';
import Simo from './img/Simo.png';

const CHARACTERS = { TACO: Taco, SEJI: Seji, SEMO: Semo, CANA: Cana, NABI: Nabi, SIMO: Simo };

const CharacterSelection = ({ index }) => {
  const selectedCharacter = Object.entries(CHARACTERS)[index];
  return (
    <Flex flexDirection="column">
      <CharacterBox src={selectedCharacter[1]} />
      <BoldText style={{ textShadow: '1px 1px 0 #000000', alignSelf: 'center' }}>{selectedCharacter[0]}</BoldText>
    </Flex>
  );
};

const random = (min, max) => Math.floor(Math.random() * (max - min)) + min;

export const Intro = ({ name, setName, setDisplayIntro, topRank, endGame }) => {
  const CHARACTER_LENGTH = Object.keys(CHARACTERS).length;
  const [characterIndex, setCharacterIndex] = useState(random(0, CHARACTER_LENGTH));
  const handleStart = useCallback(() => {
    setTimeout(() => {
      startGame(name, 'server.sleep-mode.io', endGame, characterIndex);
      // startGame(name, 'localhost:5000', endGame, characterIndex);
    }, 3000);
  }, [name, characterIndex]);

  return (
    <WideContainer height="60vh">
      <Dim />
      <JunctionText>JunctionX Seoul x aws</JunctionText>
      <LogoImage />
      <TeamText>Team_SleepMode</TeamText>
      <IntroModal>
        <Flex mt="30px">
          <FormContainer width="400px">
            <BoldText style={{ alignSelf: 'center', paddingRight: '70px' }}>Character</BoldText>
            <Flex alignItems="center">
              <LeftButton
                onClick={() => setCharacterIndex((characterIndex - 1 + CHARACTER_LENGTH) % CHARACTER_LENGTH)}
              />
              <CharacterSelection index={characterIndex} />
              <RightButton onClick={() => setCharacterIndex((characterIndex + 1) % CHARACTER_LENGTH)} />
            </Flex>
          </FormContainer>
          <FormContainer width="500px">
            <BoldText>Nickname</BoldText>
            <StyledInput
              autoFocus={true}
              placeholder={'Enter player name'}
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={10}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  !name && setName('후치');
                  handleStart();
                  setDisplayIntro(false);
                }
              }}
            />
            <BoldText>{'Leaderboard'}</BoldText>
            <Flex flexDirection="column" mt="15px">
              {topRank?.slice(0, 5).map((record: { name: string; time: string }, idx: number) => {
                return <Record key={idx} rank={idx + 1} id={record.name} time={record.time} />;
              })}
            </Flex>
          </FormContainer>
        </Flex>
        <Flex justifyContent="center">
          <StartButton
            onClick={() => {
              !name && setName('후치');
              handleStart();
              setDisplayIntro(false);
            }}
          >
            START
          </StartButton>
        </Flex>
      </IntroModal>
    </WideContainer>
  );
};

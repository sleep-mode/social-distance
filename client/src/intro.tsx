import { useState, useCallback } from 'react';
import { WideContainer, FormContainer, StyledInput, StartButton } from './components';
import { startGame } from './game/app';

export const Intro = () => {
  const [host, setHost] = useState('localhost');
  const [port, setPort] = useState('5000');
  const [name, setName] = useState('');

  const handleStart = useCallback(() => {
    startGame(name, host, port);
  }, [host, port, name]);

  return (
    <WideContainer height="60vh">
      <FormContainer width="300px">
        <StyledInput placeholder={'닉네임을 적어주세요'} value={name} onChange={e => setName(e.target.value)} />
        <StyledInput value={host} onChange={e => setHost(e.target.value)} />
        <StyledInput value={port} onChange={e => setPort(e.target.value)} />
        <StartButton onClick={handleStart}>START</StartButton>
      </FormContainer>
    </WideContainer>
  );
};

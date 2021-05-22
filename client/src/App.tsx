import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import { startGame } from './game/app';

function App() {

  const [port, setPort] = useState('5000');
  const [host, setHost] = useState('localhost');
  const [name, setName] = useState('YourName');


  const handleStart = useCallback(() => {
    startGame(name, host, port);
  }, [host, port, name]);

  return (
    <Container>
      <Canvas id="cvs" />
      <FormContainer>
     <StyledInput value={name} onChange={(e) => setName(e.target.value)} />
     <StyledInput value={host} onChange={(e) => setHost(e.target.value)} />
     <StyledInput value={port} onChange={(e) => setPort(e.target.value)} />
      <StartButton onClick={handleStart}>START</StartButton>
      </FormContainer>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

const Canvas = styled.canvas`
  height: 50vh;
  width: 100vw;
`;


const FormContainer = styled.div`
  width: 600px;
  margin: 128px auto 0 auto;
`;

const StartButton = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  border: 1px solid rgba(27, 28, 37, 0.1);
`;

const StyledInput = styled.input`
  display: block;
  height: 48px;
  outline: none;
  padding: 0 8px;
  margin-bottom: 8px;
  width: 100%;
`;

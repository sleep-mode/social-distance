import styled from '@emotion/styled';
import { width, WidthProps, height, HeightProps } from 'styled-system';

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

export const Canvas = styled.canvas`
  height: 50vh;
  width: 100vw;
`;

export const WideContainer = styled.div<HeightProps>`
  ${height}
  width: 100vw;
  overflow: hidden;
`;

export const FormContainer = styled.div<WidthProps>`
  ${width}
  align-self: center;
  margin: 128px auto 0 auto;
`;

export const StartButton = styled.div`
  cursor: pointer;
  padding: 8px 16px;
  text-align: center;
  border: 1px solid rgba(27, 28, 37, 0.1);
  border-radius: 5px;
`;

export const StyledInput = styled.input`
  display: block;
  height: 48px;
  outline: none;
  padding: 0 8px;
  margin-bottom: 8px;
  width: 100%;
`;

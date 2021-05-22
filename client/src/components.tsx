import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { ReactComponent as Logo } from './img/img_main_logo.svg';
import { ReactComponent as Start } from './img/start.svg';
import {
  alignItems,
  AlignItemsProps,
  flexDirection,
  FlexDirectionProps,
  justifyContent,
  JustifyContentProps,
  height,
  HeightProps,
  width,
  WidthProps,
  typography,
  TypographyProps,
  color,
  ColorProps,
  space,
  SpaceProps,
  position,
  PositionProps,
} from 'styled-system';

const disappearLate = keyframes`
 0% { opacity: 1 }
 70% { opacity: 1 }
 100% { opacity: 0 }
`;

const appearLate = keyframes`
 0% { opacity: 0 }
 70% { opacity: 0 }
 100% { opacity: 1 }
`;

const startDisplayAnimation = keyframes`
 0% { opacity: 1 }
 30% { opacity: 1 }
 100% { opacity: 0 }
`;

const logoDisplayAnimation = keyframes`
 0% { height: 200px; width: 700px; top: 45% }
 70% { height: 200px; width: 700px; top: 45% }
 100% { height: 70px; width: 400px; top: 15% }
`;

export const Container = styled.div`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: #143c41;
`;

export const Canvas = styled.canvas`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

export const WideContainer = styled.div<HeightProps>`
  ${height}
  width: 100vw;
  overflow: hidden;
`;

export const IntroModal = styled.div`
  width: 720px;
  height: 740px;
  padding: 70px;
  background-color: #143c41;
  border-radius: 20px;
  position: absolute;
  z-index: 100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-name: ${appearLate};
  animation-duration: 5s;
  z-index: 1000;
`;

export const JunctionText = styled.text`
  height: 30px;
  position: absolute;
  z-index: 80;
  text-shadow: 2px 2px 10px #000000;
  font-family: Quicksand;
  font-size: 34px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e5f3cd;
  animation-name: ${disappearLate};
  animation-duration: 5s;
`;

export const TeamText = styled.text`
  width: 218px;
  height: 30px;
  position: absolute;
  z-index: 80;
  text-shadow: 2px 2px 10px #000000;
  font-family: Quicksand;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: 1px;
  top: 55%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #e5f3cd;
  animation-name: ${disappearLate};
  animation-duration: 5s;
`;

export const LogoImage = styled(Logo)`
  position: absolute;
  z-index: 150;
  top: 15%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 70px;
  animation-name: ${logoDisplayAnimation};
  animation-duration: 5s;
`;

export const StartImage = styled(Start)`
  position: absolute;
  z-index: 150;
  top: 45%;
  left: 50%;
  opacity: 0;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 70px;
  animation-name: ${startDisplayAnimation};
  animation-duration: 3s;
`;

type FlexProps = AlignItemsProps & FlexDirectionProps & JustifyContentProps & HeightProps & WidthProps & SpaceProps;
export const Flex = styled.div<FlexProps>`
  display: flex;
  ${alignItems}
  ${justifyContent}
  ${flexDirection}
  ${space}
  ${height}
  ${width}
`;

export const FormContainer = styled.div<WidthProps>`
  ${width}
  display: flex;
  flex-direction: column;
  align-self: center;
  justify-contents: center;
  margin: 100px auto 0 auto;
`;

export const StartButton = styled.div`
  width: 100%;
  height: 70px;
  cursor: pointer;
  text-align: center;
  line-height: 70px;
  border: 1px solid rgba(27, 28, 37, 0.1);
  border-radius: 10px;
  margin: 0 0 60px;
  font-family: Quicksand;
  font-size: 20px;
  font-weight: bold;
  background-color: #94e806;
`;

export const StyledInput = styled.input`
  display: block;
  align-self: center;
  width: 92%;
  height: 70px;
  padding: 0px 20px;
  margin: 10px 0 30px;
  border-radius: 10px;
  border: solid 1px #a2ff00;
  caret-color: #a2ff00;
  background-color: rgba(223, 223, 223, 0.1);
  &:focus {
    outline: none;
  }
  font-size: 24px;
  font-weight: bold;
  color: white;
  font-family: Quicksand;
`;

export const BoldText = styled.text`
  text-shadow: 1px 1px 0 #000000;
  font-family: Quicksand;
  font-size: 30px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: normal;
  color: #dfdfdf;
  ${typography}
`;

export const Text = styled.text<TypographyProps & ColorProps & SpaceProps>`
  ${color}
  ${typography}
  ${space}
  font-family: Quicksand;
`;

export const InfoModal = styled.div<PositionProps & SpaceProps>`
  width: 270px;
  height: 420px;
  background-color: #143c41;
  position: absolute;
  overflow: hidden;
  top: 0%;
  opacity: 0.7;
  ${space}
  ${position}
`;

export const BestRecordModal = styled.div`
  position: absolute;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const Dim = styled.div`
  position: absolute;
  z-index: 50;
  width: 100vw;
  height: 100vh;
  opacity: 0.8;
  background-color: #143c41;
`;

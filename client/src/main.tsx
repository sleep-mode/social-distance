import { StartImage, InfoModal, Flex, BoldText } from './components';

export const Main = () => {
  return (
    <Flex>
      <InfoModal left="0%">
        <BoldText>{'Nickname'}</BoldText>
        <BoldText>{'Nickname'}</BoldText>
        <BoldText>{'Nickname'}</BoldText>
      </InfoModal>
      <InfoModal left="100%" />
      <StartImage />
    </Flex>
  );
};

import { Flex, Text } from './components';

export const Record = ({ rank, id, time }) => {
  return (
    <Flex width="100%" alignItems="center" justifyContent="space-between">
      <Flex>
        <Text color="#a2ff00" fontWeight="bold">
          {rank}
        </Text>
        <Text color="#dfdfdf" marginLeft="20px">
          {id}
        </Text>
      </Flex>
      <Flex>
        <Text color="#dfdfdf">{time}</Text>
      </Flex>
    </Flex>
  );
};

import { VStack, Text, HStack } from '@dano-inc/design-system';

export default function Index() {
  return (
    <HStack justifyContent='center' css={{ margin: '$24 $10 $48' }}>
      <VStack
        alignItems='center'
        gap='16'
        css={{
          width: '100%',
          maxWidth: '375px',
        }}
      >
        <Text variant='heading2'>여기까진 생각을 못했네요</Text>
      </VStack>
    </HStack>
  );
}

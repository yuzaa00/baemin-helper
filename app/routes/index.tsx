import { HStack, Text, VStack } from "@dano-inc/design-system";

export default function Index() {
  return (
    <HStack justifyContent="center" css={{ margin: "$24 $10 $48" }}>
      <VStack
        alignItems="center"
        gap="16"
        css={{
          width: "100%",
          maxWidth: "640px",
        }}
      >
        <Text variant="heading2">여기는 아무것도 없어요..😆</Text>
      </VStack>
    </HStack>
  );
}

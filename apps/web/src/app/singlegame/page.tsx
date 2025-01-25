import { Button } from "@/shared/components/Button";
import { Flex } from "@/shared/components/Flex";
import { Spacing } from "@/shared/components/Spacing";
import { Text } from "@/shared/components/Text";

export default function SingleGamePage() {
  return (
    <>
      {/* <Flex direction="column" gap={1} className="font-gamebasic">
        <Text typography="xs">Puzzle Pop!</Text>
        <Text typography="sm">Puzzle Pop!</Text>
        <Text typography="md">Puzzle Pop!</Text>
        <Text typography="lg">Puzzle Pop!</Text>
        <Text typography="xl">Puzzle Pop!</Text>
        <Text typography="2xl">Puzzle Pop!</Text>
      </Flex> */}
      <Flex direction="column" gap={1} justify="center" align="center" style={{ padding: 4 }}>
        <Button size="xs">Puzzle Pop!</Button>
        <Button size="sm">Puzzle Pop!</Button>
        <Button size="md">Puzzle Pop!</Button>
        <Button size="lg">Puzzle Pop!</Button>
        <Button size="xl">Puzzle Pop!</Button>
        <Button size="2xl">Puzzle Pop!</Button>
      </Flex>
    </>
  );
}

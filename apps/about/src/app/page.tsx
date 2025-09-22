import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { Nav } from "./Nav";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Flex direction="column">
          {new Array(100).fill(null).map((_, index) => {
            return <Text key={index}>샘플 {index}</Text>;
          })}
        </Flex>
      </main>
    </>
  );
}

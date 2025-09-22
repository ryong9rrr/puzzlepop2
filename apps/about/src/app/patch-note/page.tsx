import Image from "next/image";
import { Flex, Text } from "@puzzlepop2/react-components-layout";

import { Nav } from "../Nav";

export default function Page() {
  return (
    <>
      <Nav />
      <main>
        <Flex justify="center" align="center" direction="column">
          <Image
            src="https://puzzlepop.site/cdn/puzzlepop/win.webp"
            alt=""
            width={100}
            height={100}
          />
          <Text color="blue">patch note</Text>
        </Flex>
      </main>
    </>
  );
}

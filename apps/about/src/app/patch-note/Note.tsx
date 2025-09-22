import Image from "next/image";
import { PropsWithChildren } from "react";

import { Flex, Text } from "@puzzlepop2/react-components-layout";

const SubTitle = ({ children }: PropsWithChildren) => {
  return (
    <Text size="sm" bold>
      {children}
    </Text>
  );
};

const Section = ({ children }: PropsWithChildren) => {
  return (
    <Flex as="section" direction="column" gapScale={0.5}>
      {children}
    </Flex>
  );
};

const Descriptions = ({ children }: PropsWithChildren) => {
  return (
    <Flex direction="column" gapScale={0.5}>
      {children}
    </Flex>
  );
};

const Description = ({ children }: PropsWithChildren) => {
  return (
    <Text size="xs" style={{ lineHeight: "1.5" }}>
      {children}
    </Text>
  );
};

const SectionImage = ({ src }: { src: string }) => {
  return (
    <Image
      src={src}
      alt=""
      width={0}
      height={0}
      style={{
        objectFit: "cover",
        borderRadius: "0.2rem",
        width: "100%",
        height: "auto",
      }}
    />
  );
};

export { SubTitle, Section, Descriptions, Description, SectionImage };

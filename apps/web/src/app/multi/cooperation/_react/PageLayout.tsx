import { Box, Flex } from "@puzzlepop2/react-components-layout";

interface Props {
  left?: React.ReactNode;
  center?: React.ReactNode;
  right?: React.ReactNode;
}

export const PageLayout = (props: Props) => {
  const { left = null, center = null, right = null } = props;

  return (
    <Flex style={{ position: "relative" }}>
      <Box style={{ flex: 1 }}>{left}</Box>
      <Box style={{ width: "60vw", padding: "0.8rem" }}>{center}</Box>
      <Box style={{ flex: 1 }}>{right}</Box>
    </Flex>
  );
};

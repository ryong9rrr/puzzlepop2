import { Flex } from "@puzzlepop2/react-components-layout";

export const Finished = () => {
  return (
    <Flex
      direction="column"
      justify="center"
      align="center"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <div>게임이 종료되었습니다.</div>
    </Flex>
  );
};

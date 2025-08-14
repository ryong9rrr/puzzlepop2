import { Flex, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

interface Props {
  status: "waiting" | "playing";
  currentUserCount: number;
  maxUserCount: number;
  adminNickname: string;
}

export const CardGameStatus = (props: Props) => {
  const { status, currentUserCount, maxUserCount, adminNickname } = props;

  return (
    <>
      <Text
        bold
        className="font-gameInline"
        color={status === "playing" ? vars.colors.red[400] : vars.colors.blue[400]}
      >
        {status === "playing" ? "Playing" : "Waiting"}
      </Text>
      <Flex justify="space-between" align="center">
        <Text
          size="xs"
          bold
          color={
            currentUserCount >= maxUserCount || status === "playing"
              ? vars.colors.red[400]
              : vars.colors.blue[400]
          }
          style={{ marginLeft: "3px" }}
        >
          {currentUserCount} / {maxUserCount}
        </Text>
        <Text
          size="xs"
          style={{
            width: "8rem",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            textAlign: "end",
          }}
        >
          {adminNickname}
        </Text>
      </Flex>
    </>
  );
};

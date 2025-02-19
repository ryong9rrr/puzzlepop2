import { Link } from "react-router";
import { Flex, Spacing } from "@puzzlepop2/react-components-layout";

export const Header = () => {
  return (
    <Flex direction="column">
      <Link to="/">홈으로</Link>
      <Spacing size={30} />
    </Flex>
  );
};

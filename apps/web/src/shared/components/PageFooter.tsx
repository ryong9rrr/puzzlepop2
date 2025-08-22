import Link from "next/link";
import { Flex } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

export const PageFooter = () => {
  return (
    <Flex
      as="footer"
      justify="flex-end"
      align="center"
      style={{
        height: "40px",
      }}
    >
      <span
        style={{
          marginRight: "16px",
          fontSize: "16px",
          color: vars.colors.grey[600],
        }}
      >
        © 2025 팀 퍼즐팝 |{" "}
        <Link href="https://github.com/ryong9rrr/puzzlepop2" target="_blank">
          Github
        </Link>{" "}
        |{" "}
        <Link href="#" target="_blank">
          About Us
        </Link>
      </span>
    </Flex>
  );
};

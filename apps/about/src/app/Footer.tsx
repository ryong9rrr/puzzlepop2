import Link from "next/link";

import { Flex, Spacing } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

export const Footer = () => {
  return (
    <footer>
      <Spacing scale={1} />
      <Flex
        justify="flex-end"
        align="center"
        style={{
          height: "80px",
          backgroundColor: vars.colors.black,
        }}
      >
        <span
          style={{
            marginRight: "16px",
            fontSize: "16px",
            color: vars.colors.white,
          }}
        >
          © 2025 팀 퍼즐팝 |{" "}
          <Link href="https://github.com/ryong9rrr/puzzlepop2" target="_blank">
            Github
          </Link>{" "}
        </span>
      </Flex>
    </footer>
  );
};

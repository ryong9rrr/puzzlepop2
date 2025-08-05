import Link from "next/link";
import { PropsWithChildren } from "react";
import { Z_INDEX } from "@puzzlepop2/themes";
import { Flex } from "@puzzlepop2/react-components-layout";

import { AiOutlineHome as 홈 } from "react-icons/ai";
import { IoExtensionPuzzleOutline as 연습모드 } from "react-icons/io5";
import { GoPeople as 멀티게임 } from "react-icons/go";
import MODULE_CSS from "./SideNavigation.module.css";

export const SideNavigation = () => {
  return (
    <Flex
      className={MODULE_CSS.container}
      direction="column"
      justify="space-between"
      gap={20}
      align="center"
      style={{
        zIndex: Z_INDEX.DIMMED_Z_INDEX - 1,
      }}
    >
      <Link href="/">
        <Icon>
          <홈 size={40} />
        </Icon>
      </Link>
      <Link href="/single">
        <Icon>
          <연습모드 />
        </Icon>
      </Link>
      {/* TODO: /multi로 바꾸고 협동-배틀은 탭으로 처리하기 */}
      <Link href="/multi/cooperation">
        <Icon>
          <멀티게임 />
        </Icon>
      </Link>
    </Flex>
  );
};

const Icon = ({ children }: PropsWithChildren) => {
  return (
    <Flex className={MODULE_CSS.icon} justify="center" align="center">
      {children}
    </Flex>
  );
};

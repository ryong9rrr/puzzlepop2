"use client";

import { CSSProperties } from "react";
import { Flex } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

import { useSideWidgetStore } from "./useSideWidgetStore";

import { IoIosTimer as IoTimer } from "react-icons/io";
import { PiPercentBold as IoPercent } from "react-icons/pi";
import { BsImage as IoImage } from "react-icons/bs";

export const SideWidget = () => {
  const isActiveTimer = useSideWidgetStore(state => state.isActiveTimer);
  const isActivePercent = useSideWidgetStore(state => state.isActivePercent);
  const isActiveExampleImage = useSideWidgetStore(state => state.isActiveExampleImage);

  const toggleTimer = useSideWidgetStore(state => state.toggleTimer);
  const togglePercent = useSideWidgetStore(state => state.togglePercent);
  const toggleExampleImage = useSideWidgetStore(state => state.toggleExampleImage);

  const getIconStyle = (isActive: boolean) => {
    return {
      ...baseIconStyle,
      backgroundColor: isActive ? vars.colors.blue[400] : vars.colors.grey[50],
      color: vars.colors[isActive ? "white" : "black"],
    } as CSSProperties;
  };

  return (
    <Flex direction="column" justify="space-between" gap={20} align="center" style={containerStyle}>
      <Flex
        justify="center"
        align="center"
        style={getIconStyle(isActiveTimer)}
        onClick={toggleTimer}
      >
        <IoTimer size={30} />
      </Flex>
      <Flex
        justify="center"
        align="center"
        style={getIconStyle(isActivePercent)}
        onClick={togglePercent}
      >
        <IoPercent size={24} />
      </Flex>
      <Flex
        justify="center"
        align="center"
        style={getIconStyle(isActiveExampleImage)}
        onClick={toggleExampleImage}
      >
        <IoImage size={22} />
      </Flex>
    </Flex>
  );
};

const containerStyle: CSSProperties = {
  position: "absolute",
  top: "45%",
  left: "0.3rem",
  transform: "translateY(-50%)",
  width: "1.4rem",
  borderRadius: "0.6rem",
  backgroundColor: vars.colors.grey[50],
  border: `2px solid ${vars.colors.grey[300]}`,
  padding: "1rem 0.2rem",
  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
};

const baseIconStyle: CSSProperties = {
  width: "1rem",
  height: "1rem",
  borderRadius: "0.2rem",
  padding: "0.1rem",
  cursor: "pointer",
  transition: "background-color 0.2s ease, color 0.2s ease",
};

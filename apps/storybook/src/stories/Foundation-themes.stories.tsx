import type { Meta, StoryObj } from "@storybook/react";
import "@puzzlepop2/themes/themes.css";
import { Box, Flex } from "@puzzlepop2/react";

const colorLevels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const BoxStories = () => {
  return (
    <>
      <Flex>
        {colorLevels.map(level => (
          <Box
            key={level}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: `var(--orange-${level})`,
            }}
          >
            orange{level}
          </Box>
        ))}
      </Flex>
      <Flex>
        {colorLevels.map(level => (
          <Box
            key={level}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: `var(--lavender-${level})`,
            }}
          >
            lavender{level}
          </Box>
        ))}
      </Flex>
      <Flex>
        {colorLevels.map(level => (
          <Box
            key={level}
            style={{
              width: "100px",
              height: "100px",
              backgroundColor: `var(--yellow-${level})`,
            }}
          >
            yellow{level}
          </Box>
        ))}
      </Flex>
    </>
  );
};

const meta = {
  title: "Foundation/themes",
  component: BoxStories,
  parameters: {},
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Colors: Story = {};

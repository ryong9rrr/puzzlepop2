import type { Meta, StoryObj } from "@storybook/react";
import { vars, ColorLevel } from "@puzzlepop2/themes";
import { Box, Flex } from "@puzzlepop2/react-components-layout";

const colorLevels: ColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const RenderStory = () => {
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
              backgroundColor: `${vars.colors.yellow[level]}`,
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
  title: "Themes/colors",
  component: RenderStory,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof Box>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

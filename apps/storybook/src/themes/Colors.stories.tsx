import type { Meta, StoryObj } from "@storybook/react";
import { vars, ColorLevel } from "@puzzlepop2/themes";
import { Box, Flex } from "@puzzlepop2/react-components-layout";

const colorLevels: ColorLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

const RenderStory = () => {
  return (
    <div
      style={{
        fontSize: "12px",
      }}
    >
      {Object.keys(vars.colors).map(color => (
        <Flex>
          {color !== "black" &&
            color !== "white" &&
            colorLevels.map(level => (
              <Box
                key={level}
                style={{
                  width: "100px",
                  height: "100px",
                  // @ts-ignore
                  backgroundColor: vars.colors[color][level],
                }}
              >
                {color}
                {level}
              </Box>
            ))}
        </Flex>
      ))}
    </div>
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

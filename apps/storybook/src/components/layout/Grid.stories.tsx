import type { Meta, StoryObj } from "@storybook/react";
import { Box, Grid, GridItem, Text } from "@puzzlepop2/react-components-layout";

const meta = {
  title: "Components/Layout/Grid",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Grid templateColumns="repeat(3, 1fr)" gap={6}>
        <GridItem>
          <Box>
            <Text>1</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text>2</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text>3</Text>
          </Box>
        </GridItem>
        <GridItem>
          <Box>
            <Text>4</Text>
          </Box>
        </GridItem>
      </Grid>
    );
  },
};

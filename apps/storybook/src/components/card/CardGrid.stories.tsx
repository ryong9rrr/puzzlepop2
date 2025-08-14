import type { Meta, StoryObj } from "@storybook/react";
import {
  CardGridContainer,
  CardGridItem,
  CardTitle,
  CardTitleSkeleton,
  CardTags,
  CardTagsSkeleton,
} from "@puzzlepop2/react-components-card";

const meta = {
  title: "Components/Card",
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
      <CardGridContainer>
        <CardGridItem color="yellow">
          <CardTitle title="긴 제목이 들어온다면....긴 제목이 들어온다면....긴 제목이 들어온다면....긴 제목이 들어온다면....긴 제목이 들어온다면....긴 제목이 들어온다면....긴 제목이 들어온다면...." />
          <CardTags tags={["tag1", "tag2", "tag3", "tag4", "tag5"]} />
        </CardGridItem>
        <CardGridItem>
          <CardTitle title="태그가 많다면 +n 처리(반응형)" />
          <CardTags tags={new Array(15).fill(null).map((_, index) => `tag${index + 1}`)} />
        </CardGridItem>
        <CardGridItem disabled>
          <CardTitle title="짧은 title" />
          <CardTags tags={new Array(15).fill(null).map((_, index) => `tag${index + 1}`)} />
        </CardGridItem>
        <CardGridItem color="lavender">
          <CardTitle title="긴 제목은 최대 2줄까지...긴 제목은 최대 2줄까지...긴 제목은 최대 2줄까지...긴 제목은 최대 2줄까지...긴 제목은 최대 2줄까지..." />
        </CardGridItem>
        <CardGridItem>
          <CardTitleSkeleton />
          <CardTagsSkeleton />
        </CardGridItem>
        <CardGridItem>
          <CardTitle title="스켈레톤도 제공해요" />
          <CardTagsSkeleton />
        </CardGridItem>
      </CardGridContainer>
    );
  },
};

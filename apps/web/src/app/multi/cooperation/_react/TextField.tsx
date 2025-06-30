"use client";

import { Input } from "@puzzlepop2/react-components-input";
import { Spacing, Text } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";

interface Props {
  title: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TextField = (props: Props) => {
  const { title, value, onChange } = props;

  return (
    <div>
      <Text bold className="font-gameTitle">
        {title}
      </Text>
      <Spacing size={8} />
      <Input value={value} onChange={onChange} style={{ color: vars.colors.grey[700] }} />
    </div>
  );
};

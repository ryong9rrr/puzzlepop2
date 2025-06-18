import { CSSProperties, HTMLAttributes } from "react";
import clsx from "clsx";
import { Flex } from "@puzzlepop2/react-components-layout";
import { vars } from "@puzzlepop2/themes";
import styles from "./style.module.css";

interface TagProps extends HTMLAttributes<HTMLSpanElement> {
  backgroundColor?: keyof typeof vars.colors;
}

export const Tag = (props: TagProps) => {
  const { className, children, backgroundColor = "lavender", ...rest } = props;

  return (
    <span
      className={clsx(styles.tag, className)}
      style={{ backgroundColor: vars.colors[backgroundColor][400] }}
      {...rest}
    >
      {children}
    </span>
  );
};

export const TagGroup = ({
  tags,
  width = "100%",
}: {
  tags: string[];
  width?: CSSProperties["width"];
}) => {
  return (
    <div style={{ width }}>
      <Flex gapScale={0.15} style={{ whiteSpace: "nowrap", overflowX: "auto" }}>
        {tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Flex>
    </div>
  );
};

import { HTMLAttributes } from "react";
import clsx from "clsx";
import { Flex } from "@puzzlepop2/react-components-layout";
import styles from "./style.module.css";

export const Tag = (props: HTMLAttributes<HTMLSpanElement>) => {
  const { className, children, ...rest } = props;

  return (
    <span className={clsx(styles.tag, className)} {...rest}>
      #{children}
    </span>
  );
};

export const TagGroup = ({ tags }: { tags: string[] }) => {
  return (
    <Flex gapScale={0.15}>
      {tags.map(tag => (
        <Tag key={tag}>{tag}</Tag>
      ))}
    </Flex>
  );
};

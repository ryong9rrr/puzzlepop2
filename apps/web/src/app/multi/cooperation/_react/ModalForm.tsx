import { FormEvent, PropsWithChildren } from "react";
import { Flex } from "@puzzlepop2/react-components-layout";

interface Props extends PropsWithChildren {
  onSubmit: (e: FormEvent) => void;
}

export const ModalForm = (props: Props) => {
  const { onSubmit, children } = props;

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gapScale={1}>
        {children}
      </Flex>
    </form>
  );
};

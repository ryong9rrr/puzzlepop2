import { PropsWithChildren } from "react";
import { IoClose } from "react-icons/io5";
import { Button } from "@puzzlepop2/react-components-button";
import { Box, Flex, Spacing } from "@puzzlepop2/react-components-layout";

interface Props extends PropsWithChildren {
  onCloseModal: () => void;
}

export const ModalLayout = (props: Props) => {
  const { onCloseModal, children } = props;

  return (
    <>
      <Flex justify="flex-end" align="center">
        <Button
          size="xs"
          style={{
            padding: "0.25rem 0.5rem",
          }}
          onClick={onCloseModal}
        >
          <IoClose style={{ margin: 0, padding: 0, fontSize: "1rem" }} />
        </Button>
      </Flex>

      <Spacing scale={0.5} />

      <Box style={{ width: "40vw", padding: "0 0.5rem" }}>{children}</Box>

      <Spacing scale={0.5} />
    </>
  );
};

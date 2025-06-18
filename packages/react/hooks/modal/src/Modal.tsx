import { useCallback, useEffect, MouseEvent } from "react";
import { Dimmed } from "@puzzlepop2/react-components-layout";
import { ModalProps } from "./types";
import { ModalContainer } from "./ModalContainer";

export const Modal = (props: ModalProps) => {
  const { component, onClose, options } = props;

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!options || !options.closeOnEscKey || event.key !== "Escape") {
        return;
      }
      onClose();
    },
    [onClose, options],
  );

  const handleClickOutside = useCallback(
    (event: MouseEvent) => {
      if (!options || !options.closeOnOutsideClick || event.target !== event.currentTarget) {
        return;
      }
      onClose();
    },
    [onClose, options],
  );

  useEffect(() => {
    if (!options || !options.closeOnEscKey) {
      return;
    }

    window.document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown, options]);

  return (
    <Dimmed onClick={handleClickOutside}>
      <ModalContainer>{component}</ModalContainer>
    </Dimmed>
  );
};

import { useCallback, useEffect } from "react";
import { Dimmed, Flex, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { AlertProps } from "./types";
import { alertContainerStyle } from "./style.css";

export const Alert = (props: AlertProps) => {
  const { title, description, onClose, onAfterClose } = props;

  const handleClose = useCallback(() => {
    onClose();
    if (onAfterClose) {
      onAfterClose();
    }
  }, [onAfterClose, onClose]);

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.code === "Escape") {
        handleClose();
        return;
      }
    };

    window.addEventListener("keydown", keyboardHandler);
    return () => {
      window.removeEventListener("keydown", keyboardHandler);
    };
  }, [handleClose]);

  const renderTitle = useCallback(() => {
    if (typeof title === "string") {
      return (
        <Text size="lg" style={{ fontWeight: 800 }}>
          {title}
        </Text>
      );
    }
    return title;
  }, [title]);

  const renderDescription = useCallback(() => {
    if (typeof description === "string") {
      return <Text size="sm">{description}</Text>;
    }
    return description;
  }, [description]);

  return (
    <Dimmed>
      <div className={alertContainerStyle}>
        <Flex direction="column" gap={8}>
          {renderTitle()}

          {description && renderDescription()}

          <Flex direction="column" justify="flex-end">
            <Button variant="solid" size="xs" onClick={handleClose}>
              확인
            </Button>
          </Flex>
        </Flex>
      </div>
    </Dimmed>
  );
};

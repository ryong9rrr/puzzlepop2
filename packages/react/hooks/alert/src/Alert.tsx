import { useCallback } from "react";
import { Dimmed, Flex, Spacing, Text } from "@puzzlepop2/react-components-layout";
import { Button } from "@puzzlepop2/react-components-button";
import { AlertProps } from "./types";
import { AlertContainer } from "./AlertContainer";

export const Alert = (props: AlertProps) => {
  const { title, description, onClose } = props;

  const renderTitle = useCallback(() => {
    if (typeof title === "string") {
      return (
        <Flex justify="center">
          <Text bold>{title}</Text>
        </Flex>
      );
    }
    return title;
  }, [title]);

  const renderDescription = useCallback(() => {
    if (typeof description === "string") {
      return <Text size="xs">{description}</Text>;
    }
    return description;
  }, [description]);

  return (
    <Dimmed>
      <AlertContainer>
        <Flex direction="column">
          <Spacing scale={0.2} />

          {renderTitle()}

          <Spacing scale={0.4} />

          {description && (
            <Flex direction="column" align="center" justify="center">
              {renderDescription()}
              <Spacing scale={0.5} />
            </Flex>
          )}

          <Flex direction="column">
            <Button variant="solid" size="sm" onClick={onClose}>
              확인
            </Button>
          </Flex>
        </Flex>
      </AlertContainer>
    </Dimmed>
  );
};

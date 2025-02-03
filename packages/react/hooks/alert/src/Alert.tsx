import { Z_INDEX } from "@puzzlepop2/themes";
import { Dimmed } from "@puzzlepop2/react-components-layout";
import { AlertProps } from "./types";
import { CSSProperties, useCallback, useEffect } from "react";

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

  return (
    <Dimmed>
      <div style={alertContainerStyle}>
        <div>{title}</div>

        <div>{description}</div>

        <button onClick={handleClose}>확인</button>
      </div>
    </Dimmed>
  );
};

const alertContainerStyle: CSSProperties = {
  boxSizing: "border-box",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "4px",
  overflow: "hidden",
  zIndex: Z_INDEX.ALERT_Z_INDEX,

  width: "50%",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

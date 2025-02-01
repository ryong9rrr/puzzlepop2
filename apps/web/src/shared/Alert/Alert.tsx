import { CSSProperties, useCallback, useEffect } from "react";
import { Dimmed } from "@puzzlepop2/react-components-layout";
import { AlertProps } from "./AlertContext";

interface PrivateAlertProps extends AlertProps {
  onClose: () => void;
}

// TODO: 알림창 CSS
export default function Alert(props: PrivateAlertProps) {
  const { title, description, onClose, onCloseAfter } = props;

  const handleClose = useCallback(async () => {
    onClose();
    if (onCloseAfter) {
      await onCloseAfter();
    }
  }, [onClose, onCloseAfter]);

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
}

const alertContainerStyle: CSSProperties = {
  boxSizing: "border-box",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: "4px",
  overflow: "hidden",
  zIndex: "var(--alert-zindex)",

  width: "50%",
  backgroundColor: "white",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};

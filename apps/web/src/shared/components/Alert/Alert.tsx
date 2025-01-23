import { CSSProperties, useCallback, useEffect } from "react";
import { AlertProps } from "./AlertContext";
import Dimmed from "../Dimmed";

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
  }, []);

  return (
    <Dimmed>
      <div style={alertContainerStyles} className="w-1/2 bg-white shadow-lg">
        <div>{title}</div>

        <div>{description}</div>

        <button onClick={handleClose}>확인</button>
      </div>
    </Dimmed>
  );
}

const alertContainerStyles: CSSProperties = {
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%, -50%)",
  borderRadius: 4,
  overflow: "hidden",
  zIndex: "var(--alert-zindex)",
  boxSizing: "border-box",
};

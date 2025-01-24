import { useCallback, useEffect } from "react";
import clsx from "clsx";
import { AlertProps } from "./AlertContext";
import Dimmed from "../components/Dimmed";
import styles from "./Alert.module.css";

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
      <div className={clsx(styles.alertContainer, "w-1/2 bg-white shadow-lg")}>
        <div>{title}</div>

        <div>{description}</div>

        <button onClick={handleClose}>확인</button>
      </div>
    </Dimmed>
  );
}

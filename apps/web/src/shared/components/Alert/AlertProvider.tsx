import { PropsWithChildren, useCallback, useMemo, useState } from "react";
import Alert from "./Alert";
import { AlertContext, AlertProps } from "./AlertContext";

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [alertPayload, setAlertPayload] = useState<AlertProps | null>(null);

  const handleClose = useCallback(() => {
    setAlertPayload(null);
  }, []);

  const handleAlert = useCallback((alertProps: AlertProps) => {
    setAlertPayload(alertProps);
  }, []);

  const value = useMemo(
    () => ({
      isShowAlert: !!alertPayload,
      alert: handleAlert,
    }),
    [handleAlert, alertPayload],
  );

  return (
    <AlertContext.Provider value={value}>
      {children}
      {alertPayload && <Alert {...alertPayload} onClose={handleClose} />}
    </AlertContext.Provider>
  );
};

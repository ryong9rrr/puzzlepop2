import { PropsWithChildren, useMemo, useState } from "react";
import { AlertPayload } from "./types";
import { AlertContext } from "./AlertContext";
import { Alert } from "./Alert";

export const AlertProvider = ({ children }: PropsWithChildren) => {
  const [payload, setPayload] = useState<AlertPayload | null>(null);

  const value = useMemo(() => {
    return {
      isShowAlert: !!payload,
      alert: (payload: AlertPayload) => {
        setPayload(payload);
      },
    };
  }, [payload]);

  return (
    <AlertContext.Provider value={value}>
      {children}
      {payload && <Alert {...payload} onClose={() => setPayload(null)} />}
    </AlertContext.Provider>
  );
};

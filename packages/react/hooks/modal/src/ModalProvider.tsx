import { PropsWithChildren, useMemo, useState } from "react";
import { ModalPayload } from "./types";
import { ModalContext } from "./ModalContext";
import { Modal } from "./Modal";

export const ModalProvider = ({ children }: PropsWithChildren) => {
  const [payload, setPayload] = useState<ModalPayload | null>(null);

  const value = useMemo(() => {
    return {
      isShowModal: !!payload,
      open: (newPayload: ModalPayload) => {
        setPayload(newPayload);
      },
      close: () => {
        setPayload(null);
      },
    };
  }, [payload]);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {payload && <Modal {...payload} onClose={() => setPayload(null)} />}
    </ModalContext.Provider>
  );
};

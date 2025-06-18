export type ModalPayload = {
  component: React.ReactNode;
  options?: {
    closeOnEscKey?: boolean;
    closeOnOutsideClick?: boolean;
  };
};

export type ModalContextType = {
  isShowModal: boolean;
  open: (payload: ModalPayload) => void;
  close: () => void;
};

export type ModalProps = {
  onClose: () => void;
} & ModalPayload;

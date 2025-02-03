export type AlertPayload = {
  title: React.ReactNode;
  description?: React.ReactNode;
};

export type AlertContextType = {
  isShowAlert: boolean;
  alert: (payload: AlertPayload) => void;
};

export type AlertProps = {
  onClose: () => void;
} & AlertPayload;

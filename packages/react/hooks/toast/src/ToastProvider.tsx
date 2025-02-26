import { createContext, PropsWithChildren, useRef, useState } from "react";
import { ToastConfig, ToastContextProps } from "./types";
import { toastContainerStyle, toastStyle } from "./style.css";
import clsx from "clsx";

export const ToastContext = createContext<ToastContextProps>({
  toast: () => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleToast = (config: ToastConfig) => {
    if (toastConfig) {
      setToastConfig(null);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = undefined;
    }

    setToastConfig(config);

    timeoutRef.current = setTimeout(() => {
      setToastConfig(null);
      timeoutRef.current = undefined;
    }, config.duration || 3000);
  };

  return (
    <ToastContext.Provider value={{ toast: handleToast }}>
      {children}
      <div tabIndex={-1} className={toastContainerStyle}>
        {toastConfig && (
          <div className={clsx(toastStyle, toastConfig.className)} style={toastConfig.style}>
            {toastConfig.payload.message}
          </div>
        )}
      </div>
    </ToastContext.Provider>
  );
};

import { createContext, PropsWithChildren, useCallback, useMemo, useRef, useState } from "react";
import { ToastConfig, ToastContextProps } from "./types";
import { toastContainerStyle, toastStyle } from "./style.css";
import clsx from "clsx";

export const ToastContext = createContext<ToastContextProps>({
  toast: () => {},
});

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastConfig, setToastConfig] = useState<ToastConfig | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const handleToast = useCallback(
    (config: ToastConfig) => {
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
    },
    [toastConfig],
  );

  const value = useMemo(() => {
    return { toast: handleToast };
  }, [handleToast]);

  return (
    <ToastContext.Provider value={value}>
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

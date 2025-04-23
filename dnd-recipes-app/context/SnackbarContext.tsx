import React, { createContext, useContext, useState, useCallback } from "react";
import { Snackbar } from "@/components/ui/Snackbar";

interface SnackbarContextType {
  showSnackbar: (
    message: string,
    action?: { label: string; onPress: () => void }
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [action, setAction] = useState<
    { label: string; onPress: () => void } | undefined
  >();

  const showSnackbar = useCallback(
    (msg: string, act?: { label: string; onPress: () => void }) => {
      setMessage(msg);
      setAction(act);
      setVisible(true);
    },
    []
  );

  const handleDismiss = useCallback(() => {
    setVisible(false);
    setAction(undefined);
  }, []);

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <Snackbar
        visible={visible}
        message={message}
        onDismiss={handleDismiss}
        action={action}
      />
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const context = useContext(SnackbarContext);
  if (context === undefined) {
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  }
  return context;
};

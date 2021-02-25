import React, {
  createContext,
  useState,
  useEffect,
  useRef,
  useCallback,
} from "react";


const initialReset = {
  resetApp: false,
};



export const ContextApp = createContext({});

export const ContextAppProvider = ({ children }) => {
  const [resetService, setResetService] = useState(initialReset);



  const resetOn = useCallback(() => {
    setResetService({ ...initialReset, resetApp: true });
  }, []);

  const resetOff = useCallback(() => {
    setResetService({ ...resetService, resetApp: false });
  }, [resetService]);

  return (
    <ContextApp.Provider
      value={{
        resetOn,
        resetOff,
        resetService,
      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

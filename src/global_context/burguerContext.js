import React, {
    createContext,
    useState,
    useEffect,
    useRef,
    useCallback,
  } from "react";
  
  
  const initialState = {
    openDrawer: false,

  };
  
  
  
  export const HamburguerContext = createContext({});
  
  export const BurguerProvider = ({ children }) => {
    const [openService, setOpenService] = useState(initialState);
  
  
  
    const open = useCallback(() => {
      setOpenService({ ...initialState, openDrawer: true });
    }, []);
  
    const close = useCallback(() => {
      setOpenService({ ...openService, openDrawer: false });
    }, [openService]);
  
    return (
      <HamburguerContext.Provider
        value={{
          open,
          close,
          openService,
        }}
      >
        {children}
      </HamburguerContext.Provider>
    );
  };
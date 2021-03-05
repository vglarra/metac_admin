import React, {
  createContext,
  useState,
  useCallback,
  useReducer
} from "react";
import MenuReducer from './MenuReducer';

const initialSize= {
  menuLenghtSize: 0
};
const initialReset = {
  resetApp: false,
};

const menuInitial = {
  buttonState: false,
}


export const ContextApp = createContext(initialSize);

export const ContextAppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(MenuReducer, initialSize);
  const [resetService, setResetService] = useState(initialReset);
  const [menustate, setMenuState] = useState(menuInitial)

//-----Main app reload---------------
  const resetOn = useCallback(() => {
    setResetService({ ...initialReset, resetApp: true });
  }, []);

  const resetOff = useCallback(() => {
    setResetService({ ...resetService, resetApp: false });
  }, [resetService]);

//-----Button menu state------------------------------------------------
  const buttonMenuOn = useCallback(() => {
    setMenuState({ ...menuInitial, buttonState: true });
  }, []);

  const buttonMenuOff = useCallback(() => {
    setMenuState({ ...menustate, buttonState: false });
  }, [menustate]);

//-----Menu length seter ------------------------------------------------
function updateMenuLenght(size) {
  dispatch({
    type: "UPDATE_LENGTH",
    payload: size,
  });
}


  return (
    <ContextApp.Provider
      value={{
        resetOn,
        resetOff,
        resetService,
        buttonMenuOn,
        buttonMenuOff,
        menustate,
        updateMenuLenght,
        menuLenghtSize: state.menuLenghtSize

      }}
    >
      {children}
    </ContextApp.Provider>
  );
};

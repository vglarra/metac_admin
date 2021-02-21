import React, { createContext, useReducer, useCallback, useState } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  transactions: [],
};

const updateComponent = {
  refreshStateGasto: false,
  refreshStateTipoGasto: false,
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);
  const [updateService, setUpdateService] = useState(updateComponent);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  }

  const reloadGastoLst = useCallback(() => {
    setUpdateService({ ...updateComponent, refreshStateGasto: true });
  }, []);

  const revStateGastoLst = useCallback(() => {
    setUpdateService({ ...updateService, refreshStateGasto: false });
  }, [updateService]);

  const reloadComboxTipGas = useCallback(() => {
    setUpdateService({ ...updateComponent, refreshStateTipoGasto: true });
  }, []);

  const revStateComboxTipGas = useCallback(() => {
    setUpdateService({ ...updateService, refreshStateTipoGasto: false });
  }, [updateService]);

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        updateService,
        deleteTransaction,
        addTransaction,
        reloadGastoLst,
        revStateGastoLst,
        reloadComboxTipGas,
        revStateComboxTipGas,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

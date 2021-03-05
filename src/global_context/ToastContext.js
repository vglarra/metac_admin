import React, {
    createContext,
    useState,
    useCallback,
  } from 'react';
  
  const initialToast = {
    message: '',
    alertMessage: '',
    type: null,
    visible: false,
    isApiError: false,
    confirma: false,
    triggerToast: () => {},
  };

 
  export const ToastContext = createContext({});
  
  export const ToastProvider = ({children}) => {
    const [toastService, setToastService] = useState(initialToast);
  
    const showToast = useCallback(args => {
      setToastService({...initialToast, visible: true, ...args});
    }, []);
  
    const hide = useCallback(() => {
      setToastService({...toastService, visible: false });
    }, [toastService]);


    const displayToast = () => {
      //console.log('click');

      alert('hola! me apretaste');
    };
  
    return (
      <ToastContext.Provider
        value={{ 
          hide, 
          showToast, 
          toastService, 
          triggerToast: displayToast,
        }}
        >
        {children}
      </ToastContext.Provider>
    );
  };
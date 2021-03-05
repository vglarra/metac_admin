import React, { useContext, useEffect } from "react";
import { ToastContext } from "../global_context/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./toastConsumer.css"


export default function ToastConsumer() {
  const { toastService,} = useContext(ToastContext);
  let toastId = null;

  useEffect(() => {
 
  if (toastService.visible) {
    //do somthing
    displayToast();
  }

  }, [toastService]);

  function displayToast() {
    if (!toast.isActive(toastId)) {
      //console.log("Displaying Toast");
      toastId = toast(`${toastService.message}`, {

        autoClose: 2500,
        closeOnClick: false,
        toastId: "my_toast",
        closeButton: false,
        position: toast.POSITION.BOTTOM_CENTER,
      });
    } else {
      console.log("Toast already active");
    }
  }

  return ( <ToastContainer /> );
}

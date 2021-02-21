import React, { useContext, useEffect, useState } from "react";
import { ToastContext } from "../money/context/ToastContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "./toastConsumer.css"
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

import Swal from "./SweetAletrt";



export default function ToastConsumer() {
  const { toastService, hide } = useContext(ToastContext);
  const [isModal, setIsModal] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //const [toastId, setToastId] = useState(null)
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

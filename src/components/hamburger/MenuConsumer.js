import React, { useContext, useEffect } from "react";
import { ContextApp } from "../../global_context/ContexAppGlobal";


export default function MenuConsumer() {
  const { menuState,} = useContext(ContextApp);

  useEffect(() => {
 
    alert(menuState.menuLength);

  }, [menuState]);

  function alertValue() {
    alert(menuState.menuLength);

  };



};
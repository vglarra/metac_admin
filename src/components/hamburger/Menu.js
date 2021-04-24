/**
 * Displays hamburguer menu, there is an option to
 * adjust size acording to window.innerWidth
 */

import React, { useEffect, useContext, useState } from "react";
import { ContextApp } from "../../global_context/ContexAppGlobal";

const Menu = (props) => {
  const isMobile = useWindowWidth() >= 640 ? false : true;
  const isDesktopSize1 = useWindowWidth() >= 1536 ? true : false;
  const isDesktopSize2 = useWindowWidth() >= 1920 ? true : false;
  const { menuLenghtSize } = useContext(ContextApp);
  const [height, setHeight] = useState("0%");

  useEffect(() => {
    if (props.open) {
      //menu size 3 elements
      if (menuLenghtSize === 3) {
        if (isMobile) {
          setHeight("53%");
        } else {
          if ( isDesktopSize1 && !isDesktopSize2 ) {   
            //widows size = 1536
            setHeight("39%");
          } else {
            //widows size = 1920
            setHeight("33%"); //ok
          }
        }
      }

      //menu size 5 elements
      if (menuLenghtSize === 5) {
        if (isMobile) {
            //widows size = 1536
          setHeight("75%");
        } else {
          if ( isDesktopSize1 && isDesktopSize2 == false ) {
            //widows size = 1536
            setHeight("57%");
          } else {
            //widows size = 1920
            setHeight("48%");
          }
        }
      }
    }
  }, [props]);

  const styles = {
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      height: props.open ? height : 0,
      width: "100%",
      display: "flex",
      flexDirection: "column",
      background: "#477eff",
      opacity: 0.75,
      color: "black",
      transition: "height 0.09s ease",
      zIndex: 2,
    },
    menuList: {
      paddingTop: "3rem",
    },
  };
  return (
    <div style={styles.container}>
      {props.open ? <div style={styles.menuList}>{props.children}</div> : null}
    </div>
  );
};

const useWindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return windowWidth;
};

export default Menu;

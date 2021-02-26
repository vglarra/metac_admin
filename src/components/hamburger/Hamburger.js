/*import React, { useState, useEffect, useContext } from "react";
import MenuButton from "./MenuButton";
import Menu from "./Menu";
import MenuItem from "./MenuItem";
import Footer from "../footer/Footer";
import "./ham.css";

const Hamburguer = () => {
  const [menuOpen, setMenuOpen] = useState(false);


  const handleMenuClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const handleLinkClick = (val) => {
    
    setMenuOpen(false);
    alert(val)
  };

  const styles = {
    container: {
      position: "absolute",
      top: 0,
      left: 0,
      zIndex: "99",
      opacity: 0.9,
      display: "flex",
      alignItems: "center",
      background: "black",
      width: "100%",
      color: "white",

      //fontFamily: "Lobster",
    },
    logo: {
      margin: "0 auto",
    },
    body: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100vw",
      height: "100vh",
      filter: menuOpen ? "blur(2px)" : null,
      transition: "filter 0.5s ease",
    },
  };
  const menu = ["About Us", "Our Products", "Services", "FAQ", "Contact Us"];
  const menuItems = menu.map((val, index) => {
    return (
      <MenuItem
        key={index}
        delay={`${index * 0.1}s`}
        onClick={() => {
          handleLinkClick(val);
        }}
      >
        {val}
      </MenuItem>
    );
  });

  return (
    <div>
      <div style={styles.container}>
        <MenuButton onClick={handleMenuClick} color={"white"} />
        <div style={styles.logo}><h2>metacoinz</h2></div>
      </div>
      <Menu open={menuOpen}>{menuItems}</Menu>
      <div style={styles.body}>


        <div style={{ marginTop: "100px" }}>
          <h1>hola</h1>
        </div>

        <Footer name="Menu" />
      </div>
    </div>
  );
};

export default Hamburguer;*/

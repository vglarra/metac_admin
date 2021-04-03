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


import React, { useEffect, useReducer } from "react";

const listaReducer = ({ elemento }, action) => {
  switch (action.type) {
    case "ADD_ELEMENTO": {
      return {
        elemento: action.elemento
      };
    }
    // no default
  }
};
const MealList = () => {
  const [state, dispatch] = useReducer(listaReducer, { elemento: [] });

  useEffect(() => {
    const fetchElemento = () => {
      return Promise.resolve({
        data: [{ id: Math.floor(Math.random() * 100), name: "blabla" },
        { id: Math.floor(Math.random() * 100), name: "hola" }]
      });
    };
    fetchElemento().then(({ data }) =>
      dispatch({ type: "ADD_ELEMENTO", elemento: data })
    );
  }, []);

  return (
    <ul>
      {state.elemento.map((meal, index) => (
        <li key={meal.id}>{meal.name}</li>
      ))}
    </ul>
  );
};

export default MealList;

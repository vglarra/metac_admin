import React, { useState, useEffect, useContext, useCallback, useReducer } from "react";
import { useHistory } from 'react-router-dom'
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./services/auth.service";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import { ToastProvider } from "./global_context/ToastContext";
import { ContextApp } from "./global_context/ContexAppGlobal";
import Cheers from "./components/ToastConsumer";
import Money from "./money/MoneyTracker";
import MenuButton from "./components/hamburger/MenuButton";
import Menu from "./components/hamburger/Menu";
import MenuItem from "./components/hamburger/MenuItem";
import Footer from "./components/footer/Footer";

import "./App.css";


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

const App = () => {
  const { resetService, resetOn } = useContext(ContextApp);
  const [menuOpen, setMenuOpen] = useState(false);
  const [state, dispatch] = useReducer(listaReducer, { elemento: [] });
  const [currentUser, setCurrentUser] = useState(undefined);
  const menu = ["Home",  "Login", "Sign Up"];
  let history = useHistory();
  

  useEffect(() => {
    document.body.style.backgroundColor = "#404040";
    const user = AuthService.getCurrentUser();
    const newArray = [];

    if (user) {
      alert(menu);
      setCurrentUser(user);
      menu.push('User');
      if  (user.roles.includes("ROLE_MODERATOR")){
        menu.push('Moderator');
        //setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
      };
      if (user.roles.includes("ROLE_ADMIN")){
        menu.push('Admin');
        //setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
      };
      var index = menu.indexOf('Login');
      if (index !== -1) {
        menu[index] = 'LogOut';
      }; 
    };

    menu.forEach(function (item, index) {
      newArray.push({ id: index, value: item }); 
    });

    const fetchElemento = () => {
      return Promise.resolve({
        data: newArray
      });
    };
    fetchElemento().then(({ data }) =>
      dispatch({ type: "ADD_ELEMENTO", elemento: data })
    );

  }, [resetService]);


  const logOut = () => {
    AuthService.logout();
    var index = menu.indexOf('LogOut');
    if (index !== -1) {
      menu[index] = 'Login';
    }; 
    resetOn();
  };

  //-----------------Hamburguer--------------

  const handleMenuClick = () => {
    if (menuOpen) {
      setMenuOpen(false);
    } else {
      setMenuOpen(true);
    }
  };

  const handleLinkClick = (val) => {
    setMenuOpen(false);

    switch (val) {
      case 'Home':
        history.push('/home');
        break;
      case 'Moderator':
        history.push('/mod');
        break;
      case 'Admin':
        history.push('/admin');
        break;
      case 'User':
        history.push('/user');
        break;
      case 'Money':
        history.push('/expense');
        break;
      case '${currentUser.username}':
        history.push('/profile');
        break;
      case 'LogOut':
        logOut();
        history.push('/');
        break;
      case 'Login':
        history.push('/login')
        break;
      case 'Sign Up':
        history.push('/register');
            break;
      default:
        console.log('no hay elementos menu');
    }

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
      background: "#808080",
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
      paddingTop: '60px'
    },
  };
  const menuItems = state.elemento.map((val, index) => {
    return (
      <MenuItem
        key={index}
        delay={`${index * 0.1}s`}
        onClick={() => {
          handleLinkClick(val.value);
        }}
      >
        {val.value}
      </MenuItem>
    );
  });
  //-----------------Hamburguer--------------

  return (
    <div>
      <div>
        <ToastProvider>
          <div style={styles.container}>
            <MenuButton onClick={handleMenuClick} color={"#6bff6b"} />
            <div style={styles.logo}>
              <h2>metacoinz</h2>
            </div>
          </div>
          <Menu open={menuOpen}>{menuItems}</Menu>
          <div style={styles.body}>
            <Switch>
              <Route exact path={["/", "/home"]} component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/profile" component={Profile} />
              <Route path="/user" component={BoardUser} />
              <Route path="/mod" component={BoardModerator} />
              <Route path="/admin" component={BoardAdmin} />
              <Route path="/expense" component={Money} />
            </Switch>

            <Footer title={"metacoinz.com"} color={"#6bff6b"} />

            <Cheers />
          </div>
        </ToastProvider>
      </div>
    </div>
  );
};

export default App;

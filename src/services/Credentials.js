import React, { useEffect, useState, useContext } from 'react';
import { ContextApp } from "../global_context/ContexAppGlobal";
import axios from "axios";

const API_URL = "http://node.humanapp.space:5000/api/auth/";

const Credentials = ( email, password ) => {
  const context = useContext(ContextApp)
  return ( 
    axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    })
  );
};

export default Credentials;
import axios from "axios";



const API_URL = `${process.env.REACT_APP_API_AUTH}/api/auth/`;

const register = (username, email, password) => {
  return axios.post(API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (email, password) => {

  return axios
    .post(API_URL + "signin", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        window.localStorage.setItem("user", JSON.stringify(response.data));
      }

      return response.data;
    });
};

const logout = () => {
  window.localStorage.removeItem("user");
};

const getCurrentUser = () => {
  return JSON.parse(window.localStorage.getItem("user"));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};



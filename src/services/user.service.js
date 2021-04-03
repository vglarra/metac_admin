import axios from "axios";
import authHeader from "./auth-header";


const API_URL = `${process.env.REACT_APP_API_AUTH}/api/test/`;

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = (modId) => {
  return axios.post(API_URL + "mod", { userId: modId }, { headers: authHeader() });
};

const getAdminBoard = (adminId) => {
  return axios.post(API_URL + "admin", { userId: adminId }, { headers: authHeader() });
};

export default {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
};
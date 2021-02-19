import axios from "axios";
import DbAuthHeader from "../db.auth-service";
import AuthService from "../auth.service";

const currentUser = AuthService.getCurrentUser();
const API_URL = "http://node.humanapp.space:5000/api/auth/";

const postCsuTipGas = () => {
  return axios.post(
    API_URL + "csu-tip-gas-usr",
    { userId: currentUser.id },
    { headers: DbAuthHeader() }
  );
};

const grbTipGas = (nameTipGas) => {
  return axios.post(
    API_URL + "grb-tip-gas-usr",
    {
      userId: currentUser.id,
      ttg_des_gas: nameTipGas,
    },
    { headers: DbAuthHeader() }
  );
};

//eli-tip-gas-ing
const delEliTipGas = (idTipGasto) => {
  return axios.post(
    API_URL + "eli-tip-gas-usr",
    { ttg_cod_gas: idTipGasto, userId: currentUser.id },
    { headers: DbAuthHeader() }
  );
};

const actTipGas = (idTipGasto, nameTipGasIng) => {
  return axios.post(
    API_URL + "act-tip-gas-usr",
    {
      ttg_cod_gas: idTipGasto,
      userId: currentUser.id,
      new_des_gas: nameTipGasIng,
    },
    { headers: DbAuthHeader() }
  );
};

export default {
  postCsuTipGas,
  grbTipGas,
  delEliTipGas,
  actTipGas,
  //... aqui se decalran el resto de las funciones
};

import axios from "axios";
import DbAuthHeader from "../auth-header";

const API_URL = "http://node.humanapp.space:5000/api/auth/";

const postCsuTipGas = (idUser) => {
  return axios.post(
    API_URL + "csu-tip-gas-usr",
    { userId: idUser },
    { headers: DbAuthHeader() }
  );
};

const grbTipGas = (idUser, nameTipGas) => {
  return axios.post(
    API_URL + "grb-tip-gas-usr",
    {
      userId: idUser,
      ttg_des_gas: nameTipGas,
    },
    { headers: DbAuthHeader() }
  );
};

//eli-tip-gas-ing
const delEliTipGas = (idUser, idTipGasto) => {
  return axios.post(
    API_URL + "eli-tip-gas-usr",
    { ttg_cod_gas: idTipGasto, userId: idUser },
    { headers: DbAuthHeader() }
  );
};

const actTipGas = (idUser, idTipGasto, nameTipGasIng) => {
  return axios.post(
    API_URL + "act-tip-gas-usr",
    {
      ttg_cod_gas: idTipGasto,
      userId: idUser,
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

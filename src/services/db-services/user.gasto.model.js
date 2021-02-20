import axios from "axios";
import DbAuthHeader from "../db.auth-service";
import AuthService from "../auth.service";

const currentUser = AuthService.getCurrentUser();
const API_URL = "http://node.humanapp.space:5000/api/auth/";

const postCsuGasto = () => {
  return axios.post(
    API_URL + "csu-gas-usr",
    { userId: currentUser.id },
    { headers: DbAuthHeader() }
  );
};

const grabarGasto = (codTipGas, monto) => {
  return axios.post(
    API_URL + "grb-gas-usr",
    {
      ttg_cod_gas: codTipGas,
      tgu_mod_gas: 0,
      tgu_mon_gas: monto,
      userId: currentUser.id,
    },
    { headers: DbAuthHeader() }
  );
};

//eli-tip-gas-ing
const eliminarGasto = (idTipGasto) => {
  return axios.post(
    API_URL + "eli-gas-usr",
    { ttg_cod_gas: idTipGasto, userId: currentUser.id },
    { headers: DbAuthHeader() }
  );
};

const actGasto = (idTipGasto, nameTipGasIng) => {
  return axios.post(
    API_URL + "act-gas-usr",
    {
      ttg_cod_gas: idTipGasto,
      userId: currentUser.id,
      new_des_gas: nameTipGasIng,
    },
    { headers: DbAuthHeader() }
  );
};

export default {
  postCsuGasto,
  grabarGasto,
  eliminarGasto,
  actGasto,
  //... aqui se decalran el resto de las funciones
};
